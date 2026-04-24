'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import Header from '@/components/Header';

export default function HomePage() {
  const { t } = useLanguage();
  const { startGame } = useGame();
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [touched, setTouched] = useState(false);

  const trimmed = nickname.trim();
  const isValid = trimmed.length >= 2 && trimmed.length <= 20;

  function handleStart() {
    if (!isValid) {
      setTouched(true);
      return;
    }
    startGame(trimmed);
    router.push('/quiz');
  }

  function validationMessage() {
    if (!touched) return null;
    if (trimmed.length < 2) return t.home.nicknameMin;
    if (trimmed.length > 20) return t.home.nicknameMax;
    return null;
  }

  const errorMsg = validationMessage();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold mb-3">
              <span className="text-[#7C3AED]">Verb</span>
              <span className="text-[#F97316]">Quizz</span>
            </h1>
            <p className="text-[#94A3B8] text-lg">{t.home.subtitle}</p>
          </div>

          <div className="bg-[#1A1A2E] border border-[#2D2D4E] rounded-3xl p-8 flex flex-col gap-6">
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-semibold text-[#94A3B8] mb-2"
              >
                {t.home.nicknameLabel}
              </label>
              <input
                id="nickname"
                type="text"
                maxLength={20}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onBlur={() => setTouched(true)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder={t.home.nicknamePlaceholder}
                className="w-full bg-[#0F0F1A] border border-[#2D2D4E] rounded-xl px-4 py-3 text-white placeholder-[#4A4A6A] focus:outline-none focus:border-[#7C3AED] transition-colors text-lg"
              />
              {errorMsg && (
                <p className="text-[#EF4444] text-sm mt-2">{errorMsg}</p>
              )}
            </div>

            <button
              onClick={handleStart}
              className="w-full py-4 rounded-xl font-extrabold text-xl bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-95 transition-all text-white cursor-pointer"
            >
              {t.home.startButton}
            </button>
          </div>

          <p className="text-center text-[#4A4A6A] text-sm mt-6">{t.home.footer}</p>
        </div>
      </main>
    </div>
  );
}
