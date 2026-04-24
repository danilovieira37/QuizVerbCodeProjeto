'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import type { RankingEntry } from '@/lib/supabase';
import Header from '@/components/Header';
import Ranking from '@/components/Ranking';

export default function ResultPage() {
  const router = useRouter();
  const { state, resetGame, isFinished } = useGame();
  const { t } = useLanguage();

  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [rankingLoading, setRankingLoading] = useState(true);
  const [rankingError, setRankingError] = useState(false);
  const [scoreSubmitError, setScoreSubmitError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const correctCount = state.answers.filter((a) => a.correct).length;

  useEffect(() => {
    if (!state.nickname || state.questions.length === 0) {
      router.replace('/');
      return;
    }
  }, [state.nickname, state.questions.length, router]);

  // Submit score once
  useEffect(() => {
    if (submitted || !state.nickname || state.questions.length === 0) return;
    setSubmitted(true);

    async function submit() {
      try {
        const res = await fetch('/api/ranking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nickname: state.nickname,
            score: state.totalScore,
            correct_answers: correctCount,
          }),
        });
        if (!res.ok) throw new Error(`POST /api/ranking ${res.status}`);
      } catch (err) {
        console.error('[ranking/submit]', err);
        setScoreSubmitError(true);
      }

      try {
        const res = await fetch('/api/ranking');
        if (!res.ok) throw new Error();
        const data: RankingEntry[] = await res.json();
        setRanking(data);
      } catch {
        setRankingError(true);
      } finally {
        setRankingLoading(false);
      }
    }

    submit();
  }, [submitted, state.nickname, state.totalScore, state.questions.length, correctCount]);

  function handlePlayAgain() {
    resetGame();
    router.push('/');
  }

  const playerPosition =
    ranking.findIndex(
      (e) => e.nickname.toLowerCase() === state.nickname.toLowerCase()
    ) + 1;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-xl">
          {/* Score card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A2E] border border-[#2D2D4E] rounded-3xl p-8 text-center mb-8"
          >
            <p className="text-[#94A3B8] text-sm font-semibold uppercase tracking-widest mb-1">
              {t.result.title}
            </p>
            <h2 className="text-6xl font-extrabold text-[#F97316] mb-1">
              {state.totalScore.toLocaleString()}
            </h2>
            <p className="text-[#94A3B8] text-sm mb-6">{t.result.score}</p>

            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#7C3AED]">{correctCount}</p>
                <p className="text-[#94A3B8] text-xs">{t.result.correct} {t.result.outOf}</p>
              </div>
              {playerPosition > 0 && (
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-white">#{playerPosition}</p>
                  <p className="text-[#94A3B8] text-xs">{t.result.yourPosition}</p>
                </div>
              )}
            </div>
          </motion.div>

          {scoreSubmitError && (
            <p className="text-[#F97316] text-sm text-center mb-4">
              ⚠ {t.result.scoreError}
            </p>
          )}

          {/* Ranking */}
          <h3 className="text-lg font-extrabold text-white mb-4">{t.result.ranking}</h3>
          <Ranking
            entries={ranking}
            currentNickname={state.nickname}
            loading={rankingLoading}
            error={rankingError}
          />

          {/* Play again */}
          <button
            onClick={handlePlayAgain}
            className="mt-8 w-full py-4 rounded-xl font-extrabold text-xl bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-95 transition-all text-white cursor-pointer"
          >
            {t.result.playAgain}
          </button>
        </div>
      </main>
    </div>
  );
}
