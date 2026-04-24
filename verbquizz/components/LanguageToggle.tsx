'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-[#2D2D4E] rounded-full p-1 text-sm font-semibold">
      <button
        onClick={() => setLocale('pt')}
        className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
          locale === 'pt'
            ? 'bg-[#7C3AED] text-white'
            : 'text-[#94A3B8] hover:text-white'
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
          locale === 'en'
            ? 'bg-[#7C3AED] text-white'
            : 'text-[#94A3B8] hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
