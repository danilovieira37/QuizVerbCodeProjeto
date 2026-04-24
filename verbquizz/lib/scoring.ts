export function calculateScore(timeLeft: number, correct: boolean): number {
  if (!correct) return 0;
  return Math.max(100, Math.min(1500, timeLeft * 100));
}
