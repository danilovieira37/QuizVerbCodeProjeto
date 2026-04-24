import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { GameProvider } from '@/context/GameContext';
import ErrorBoundary from '@/components/ErrorBoundary';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata: Metadata = {
  title: 'VerbQuizz — Pratique o Past Simple',
  description:
    'Quizz gamificado para praticar verbos irregulares e regulares no Past Simple do inglês.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0F0F1A] text-[#F8F8F2] antialiased">
        <ErrorBoundary>
          <LanguageProvider>
            <GameProvider>{children}</GameProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
