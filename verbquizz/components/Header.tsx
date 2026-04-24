'use client';

import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-[#1A1A2E] border-b border-[#2D2D4E]">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧠</span>
        <span className="text-xl font-extrabold text-white tracking-tight">
          <span className="text-[#7C3AED]">Verb</span>
          <span className="text-[#F97316]">Quizz</span>
        </span>
      </div>
      <LanguageToggle />
    </header>
  );
}
