'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Question } from '@/lib/questions';
import { shuffleOptions } from '@/lib/shuffle';
import { useLanguage } from '@/context/LanguageContext';

type Props = {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  selectedAnswer?: string;
  correct?: boolean;
};

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

function getOptionStyle(option: string, answer: string, disabled: boolean, selectedAnswer?: string) {
  if (!disabled) {
    return 'bg-[#1A1A2E] border border-[#2D2D4E] hover:bg-[#22223F] hover:border-[#7C3AED] cursor-pointer text-white';
  }
  if (option === answer) {
    return 'bg-[#3B82F6] border border-[#3B82F6] text-white';
  }
  if (option === selectedAnswer && option !== answer) {
    return 'bg-[#EF4444] border border-[#EF4444] text-white';
  }
  return 'bg-[#1A1A2E] border border-[#2D2D4E] text-[#94A3B8] opacity-60';
}

function getTFStyle(value: string, answer: string, disabled: boolean, selectedAnswer?: string) {
  const isSelected = selectedAnswer === value;
  const isCorrect = value === answer;
  if (!disabled) {
    return value === 'true'
      ? 'bg-[#3B82F6] hover:opacity-90 cursor-pointer text-white'
      : 'bg-[#EF4444] hover:opacity-90 cursor-pointer text-white';
  }
  if (isCorrect) return 'bg-[#3B82F6] text-white';
  if (isSelected && !isCorrect) return 'bg-[#EF4444]/50 text-white border-2 border-[#EF4444]';
  return value === 'true'
    ? 'bg-[#3B82F6]/30 text-white opacity-60'
    : 'bg-[#EF4444]/30 text-white opacity-60';
}

const QuizCard = memo(function QuizCard({
  question,
  onAnswer,
  disabled,
  selectedAnswer,
  correct,
}: Props) {
  const { locale, t } = useLanguage();
  const locale_q = question[locale];

  const shuffledOptions = useMemo(() => {
    if (question.type === 'multiple-choice') {
      return shuffleOptions(question.options);
    }
    return [];
  }, [question]);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${
            question.isIrregular
              ? 'bg-[#7C3AED]/20 text-[#A78BFA]'
              : 'bg-[#F97316]/20 text-[#FB923C]'
          }`}
        >
          {question.isIrregular ? t.quiz.irregular : t.quiz.regular}
        </span>
        <span className="text-xs text-[#94A3B8] font-medium">
          {question.type === 'true-false' ? t.quiz.trueFalse : t.quiz.multipleChoice}
        </span>
      </div>

      <div className="bg-[#1A1A2E] border border-[#2D2D4E] rounded-2xl p-6 mb-6">
        <p className="text-xl font-bold text-white text-center leading-relaxed">
          {locale_q.question}
        </p>
      </div>

      {question.type === 'true-false' ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => !disabled && onAnswer('true')}
            className={`rounded-2xl py-6 text-xl font-extrabold transition-all ${getTFStyle('true', question.answer, disabled, selectedAnswer)}`}
          >
            {t.quiz.trueButton}
          </button>
          <button
            onClick={() => !disabled && onAnswer('false')}
            className={`rounded-2xl py-6 text-xl font-extrabold transition-all ${getTFStyle('false', question.answer, disabled, selectedAnswer)}`}
          >
            {t.quiz.falseButton}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {shuffledOptions.map((option, idx) => (
            <button
              key={option}
              onClick={() => !disabled && onAnswer(option)}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left font-semibold transition-all ${getOptionStyle(option, question.answer, disabled, selectedAnswer)}`}
            >
              <span className="w-8 h-8 rounded-full bg-[#2D2D4E] flex items-center justify-center text-sm font-bold shrink-0">
                {OPTION_LABELS[idx]}
              </span>
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
});

export default QuizCard;
