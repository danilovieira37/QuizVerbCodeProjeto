# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VerbQuizz is a Kahoot-style gamified web quiz for practicing English irregular and regular verbs in the past simple. Full product specification is in `prd.md`.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Audio:** Web Audio API (countdown sound only, triggered after user interaction — no external library)
- **Database:** Supabase (PostgreSQL) — global persistent ranking
- **Hosting:** Vercel, deployed via GitHub (`main` branch → auto deploy)

## Common Commands

```bash
npm run dev        # start dev server (localhost:3000)
npm run build      # production build
npm run lint       # ESLint
npm run type-check # tsc --noEmit
```

## Architecture

```
/app
  /api
    /ranking       # GET (top 10) and POST (save score) — Supabase calls live here
  /[locale]        # PT (default) and EN routes via next-intl or similar i18n lib
  page.tsx         # Nickname entry screen
  quiz/page.tsx    # Active quiz session (timer, questions, scoring)
  result/page.tsx  # End-of-session score + global ranking display
/components
  QuizCard.tsx     # Renders a single question (TrueFalse or MultipleChoice)
  Timer.tsx        # Countdown bar + Web Audio API tick at ≤5s
  Ranking.tsx      # Top 10 leaderboard table
/lib
  questions.ts     # Full question bank (auto-generated, PT + EN per question)
  scoring.ts       # Score formula: base 1000pts × speed multiplier
  supabase.ts      # Supabase client initialisation
/messages          # i18n JSON files: pt.json, en.json
```

## Key Product Rules (from PRD)

- **10 questions per session**, shuffled without repetition from the full bank.
- **30-second timer** per question; timeout = wrong answer (0 pts).
- **Score formula:** correct answer → `1000 × speedFactor` where speedFactor = 1.0 (<5s), 0.7 (<15s), 0.4 (<30s). Wrong = 0.
- **Feedback after every question:** show correct answer + short didactic explanation (PT and EN versions).
- **Audio** fires only after user clicks "Iniciar" (browser autoplay policy). Sound plays in the last 5 seconds of the timer only.
- **No login.** Nickname is free-text (2–20 chars), stored alongside the score in Supabase.
- **Language toggle (PT|EN)** must be visible on every screen; PT is the default.
- **Theme:** dark background, purple + orange accent palette. No green anywhere in the UI.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Set these in Vercel dashboard and in a local `.env.local` file (not committed).

## Supabase Schema

```sql
create table rankings (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  score integer not null,
  correct_answers integer not null,
  created_at timestamptz default now()
);
```

## Question Bank Shape

Each entry in `lib/questions.ts` follows this type:

```ts
type Question = {
  id: string;
  type: 'true-false' | 'multiple-choice';
  verb: string;           // infinitive form
  pt: { question: string; explanation: string };
  en: { question: string; explanation: string };
  options?: string[];     // only for multiple-choice, 4 items
  answer: string;         // correct answer value
};
```

Irregular verbs: minimum 80 entries. Regular verbs: minimum 30 entries (cover -ed, drop-e, double-consonant, y→ied spelling rules).
