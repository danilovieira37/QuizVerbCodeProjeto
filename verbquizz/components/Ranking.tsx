'use client';

import { useLanguage } from '@/context/LanguageContext';
import type { RankingEntry } from '@/lib/supabase';

type Props = {
  entries: RankingEntry[];
  currentNickname: string;
  loading: boolean;
  error: boolean;
};

export default function Ranking({ entries, currentNickname, loading, error }: Props) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="text-center py-8 text-[#94A3B8] animate-pulse">
        {t.result.loadingRanking}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-[#EF4444]">
        {t.result.rankingError}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#2D2D4E]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#2D2D4E] text-[#94A3B8]">
            <th className="py-3 px-4 text-left font-semibold w-10">{t.result.rankingPosition}</th>
            <th className="py-3 px-4 text-left font-semibold">{t.result.rankingNickname}</th>
            <th className="py-3 px-4 text-right font-semibold">{t.result.rankingScore}</th>
            <th className="py-3 px-4 text-right font-semibold hidden sm:table-cell">{t.result.rankingDate}</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => {
            const isCurrentPlayer = entry.nickname.toLowerCase() === currentNickname.toLowerCase();
            return (
              <tr
                key={entry.id}
                className={`border-t border-[#2D2D4E] transition-colors ${
                  isCurrentPlayer
                    ? 'bg-[#7C3AED]/20 text-white'
                    : 'bg-[#1A1A2E] text-[#F8F8F2]'
                }`}
              >
                <td className="py-3 px-4">
                  <span
                    className={`font-extrabold ${
                      idx === 0 ? 'text-yellow-400' :
                      idx === 1 ? 'text-slate-300' :
                      idx === 2 ? 'text-amber-600' :
                      'text-[#94A3B8]'
                    }`}
                  >
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold">
                  {entry.nickname}
                  {isCurrentPlayer && (
                    <span className="ml-2 text-xs text-[#A78BFA]">({t.result.you})</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#F97316]">
                  {entry.score.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right text-[#94A3B8] hidden sm:table-cell">
                  {new Date(entry.created_at).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
