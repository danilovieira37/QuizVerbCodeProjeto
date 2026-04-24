export function calculateScore(timeLeft: number, correct: boolean): number {
  if (!correct) return 0;
  if (timeLeft > 25) return 1000;
  if (timeLeft > 15) return 700;
  return 400;
}
