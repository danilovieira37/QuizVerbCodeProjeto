import type { Question } from './questions';

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function pickQuestions(allQuestions: Question[], count: number): Question[] {
  return shuffleArray(allQuestions).slice(0, count);
}

export function shuffleOptions(options: string[]): string[] {
  return shuffleArray(options);
}
