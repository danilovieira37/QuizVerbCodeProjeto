import type { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import type { RankingEntry } from '@/lib/supabase';

// In-memory rate limiter — works per warm serverless instance.
// For distributed deployments, replace with Upstash Redis or similar.
const ipRequests = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

const MAX_SCORE = 10_000; // 10 questions × 1000 pts max
const MAX_CORRECT = 10;

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('rankings')
      .select('id, nickname, score, correct_answers, created_at')
      .order('score', { ascending: false })
      .limit(10);

    if (error) throw error;
    return Response.json(data as RankingEntry[]);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: { nickname: unknown; score: unknown; correct_answers: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { nickname: rawNickname, score, correct_answers } = body;
  const nickname =
    typeof rawNickname === 'string' ? rawNickname.trim().replace(/[<>]/g, '') : '';

  if (
    nickname.length < 2 ||
    nickname.length > 20 ||
    typeof score !== 'number' ||
    !Number.isInteger(score) ||
    score < 0 ||
    score > MAX_SCORE ||
    typeof correct_answers !== 'number' ||
    !Number.isInteger(correct_answers) ||
    correct_answers < 0 ||
    correct_answers > MAX_CORRECT
  ) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    const supabase = getSupabase();

    // Check if nickname already exists (case-insensitive), pick highest score
    const { data: rows } = await supabase
      .from('rankings')
      .select('id, score')
      .ilike('nickname', nickname)
      .order('score', { ascending: false })
      .limit(1);
    const existing = rows?.[0] ?? null;

    if (existing) {
      // Only update if new score is higher
      if (score > existing.score) {
        const { data, error } = await supabase
          .from('rankings')
          .update({ score, correct_answers, created_at: new Date().toISOString() })
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        return Response.json(data, { status: 200 });
      }
      // New score is not higher — return existing without changes
      return Response.json(existing, { status: 200 });
    }

    // Nickname not found — insert new record
    const { data, error } = await supabase
      .from('rankings')
      .insert({ nickname, score, correct_answers })
      .select()
      .single();

    if (error) throw error;
    return Response.json(data, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
