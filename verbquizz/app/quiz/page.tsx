'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import { calculateScore } from '@/lib/scoring';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
import QuizCard from '@/components/QuizCard';

const TOTAL_TIME = 30;
const FEEDBACK_DELAY_MS = 2500;

export default function QuizPage() {
  const router = useRouter();
  const { state, recordAnswer, nextQuestion, isFinished } = useGame();
  const { locale, t } = useLanguage();

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [timerRunning, setTimerRunning] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [showFeedback, setShowFeedback] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [wasCorrect, setWasCorrect] = useState(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeLeftRef = useRef(TOTAL_TIME);

  const currentQuestion = state.questions[state.currentIndex];

  useEffect(() => {
    if (!state.nickname || state.questions.length === 0) {
      router.replace('/');
    }
  }, [state.nickname, state.questions.length, router]);

  useEffect(() => {
    if (isFinished) {
      router.push('/result');
    }
  }, [isFinished, router]);

  // Reset state when question changes
  useEffect(() => {
    timeLeftRef.current = TOTAL_TIME;
    setTimeLeft(TOTAL_TIME);
    setTimerRunning(true);
    setSelectedAnswer(undefined);
    setShowFeedback(false);
    setPointsEarned(0);
    setWasCorrect(false);
  }, [state.currentIndex]);

  // Keep ref in sync so handleAnswer reads latest value without being in its deps
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const handleAnswer = useCallback(
    (answer: string, timedOut = false) => {
      if (showFeedback) return;
      setTimerRunning(false);
      const correct = !timedOut && answer === currentQuestion.answer;
      const pts = calculateScore(timeLeftRef.current, correct);
      setSelectedAnswer(timedOut ? undefined : answer);
      setWasCorrect(correct);
      setPointsEarned(pts);
      setShowFeedback(true);
      recordAnswer({
        questionId: currentQuestion.id,
        correct,
        timeLeft: timeLeftRef.current,
        pointsEarned: pts,
      });
      feedbackTimerRef.current = setTimeout(() => {
        nextQuestion();
      }, FEEDBACK_DELAY_MS);
    },
    [showFeedback, currentQuestion, recordAnswer, nextQuestion]
  );

  // Countdown timer
  useEffect(() => {
    if (!timerRunning || showFeedback) return;
    if (timeLeft <= 0) {
      handleAnswer('', true);
      return;
    }
    const id = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, timerRunning, showFeedback, handleAnswer]);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  if (!currentQuestion) return null;

  const locale_q = currentQuestion[locale];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-xl">
          {/* Progress bar + score */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#94A3B8] text-sm font-semibold">
              {t.quiz.question} {state.currentIndex + 1} {t.quiz.of} {state.questions.length}
            </span>
            <span className="text-[#F97316] font-extrabold">
              {state.totalScore.toLocaleString()} {t.quiz.points}
            </span>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1 mb-6">
            {state.questions.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  i < state.currentIndex
                    ? 'bg-[#7C3AED]'
                    : i === state.currentIndex
                    ? 'bg-[#F97316]'
                    : 'bg-[#2D2D4E]'
                }`}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="mb-6">
            <Timer
              timeLeft={timeLeft}
              totalTime={TOTAL_TIME}
              running={timerRunning && !showFeedback}
            />
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <QuizCard
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
              disabled={showFeedback}
              selectedAnswer={selectedAnswer}
              correct={wasCorrect}
            />
          </AnimatePresence>

          {/* Feedback panel */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 rounded-2xl p-5 border ${
                  wasCorrect
                    ? 'bg-[#3B82F6]/10 border-[#3B82F6]'
                    : 'bg-[#EF4444]/10 border-[#EF4444]'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{wasCorrect ? '✅' : timeLeft <= 0 ? '⏰' : '❌'}</span>
                  <div>
                    <p className={`font-extrabold text-lg ${wasCorrect ? 'text-[#3B82F6]' : 'text-[#EF4444]'}`}>
                      {timeLeft <= 0 && !wasCorrect ? t.quiz.timeout : wasCorrect ? t.quiz.correct : t.quiz.wrong}
                    </p>
                    {wasCorrect && pointsEarned > 0 && (
                      <p className="text-[#F97316] font-bold text-sm">
                        +{pointsEarned} {t.quiz.points}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{locale_q.explanation}</p>
                <button
                  onClick={() => {
                    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
                    nextQuestion();
                  }}
                  className="mt-4 w-full py-2.5 rounded-xl bg-[#2D2D4E] hover:bg-[#3D3D5E] text-white font-semibold transition-colors text-sm cursor-pointer"
                >
                  {t.quiz.nextButton} →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
