'use client';

import { useEffect, useRef, useCallback } from 'react';

type Props = {
  timeLeft: number;
  totalTime: number;
  running: boolean;
};

const BASE_TICK_INTERVAL = 0.75;
const FAST_TICK_INTERVAL = 0.35;
const FAST_TICK_THRESHOLD = 5;

export default function Timer({ timeLeft, totalTime, running }: Props) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextTickRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  }, []);

  const playTick = useCallback(
    (atTime: number, fast: boolean) => {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = fast ? 1200 : 880;
      gain.gain.setValueAtTime(0.25, atTime);
      gain.gain.exponentialRampToValueAtTime(0.001, atTime + 0.06);
      osc.start(atTime);
      osc.stop(atTime + 0.08);
    },
    [getAudioCtx]
  );

  useEffect(() => {
    if (!running) {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const ctx = getAudioCtx();
    nextTickRef.current = ctx.currentTime;

    const tick = () => {
      const now = ctx.currentTime;
      const fast = timeLeft <= FAST_TICK_THRESHOLD;
      const interval = fast ? FAST_TICK_INTERVAL : BASE_TICK_INTERVAL;

      while (nextTickRef.current < now + 0.1) {
        playTick(nextTickRef.current, fast);
        nextTickRef.current += interval;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [running, timeLeft, playTick, getAudioCtx]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  const pct = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= FAST_TICK_THRESHOLD;
  const barColor = isUrgent ? '#EF4444' : timeLeft <= 15 ? '#F97316' : '#7C3AED';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-2xl font-extrabold tabular-nums transition-colors ${
            isUrgent ? 'text-[#EF4444]' : 'text-white'
          }`}
        >
          {timeLeft}s
        </span>
      </div>
      <div className="w-full h-4 rounded-full bg-[#2D2D4E] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}
