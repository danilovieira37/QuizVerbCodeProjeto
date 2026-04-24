'use client';

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import type { Question } from '@/lib/questions';
import { ALL_QUESTIONS } from '@/lib/questions';
import { pickQuestions } from '@/lib/shuffle';

const SESSION_KEY = 'verbquizz_game';
const QUESTIONS_PER_ROUND = 10;

export type AnswerRecord = {
  questionId: string;
  correct: boolean;
  timeLeft: number;
  pointsEarned: number;
};

type GameState = {
  nickname: string;
  questions: Question[];
  currentIndex: number;
  answers: AnswerRecord[];
  totalScore: number;
};

type GameAction =
  | { type: 'START'; nickname: string; questions: Question[] }
  | { type: 'RECORD_ANSWER'; record: AnswerRecord }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESET' };

type GameContextType = {
  state: GameState;
  startGame: (nickname: string) => void;
  recordAnswer: (record: AnswerRecord) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  isFinished: boolean;
};

const DEFAULT_STATE: GameState = {
  nickname: '',
  questions: [],
  currentIndex: 0,
  answers: [],
  totalScore: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START':
      return {
        nickname: action.nickname,
        questions: action.questions,
        currentIndex: 0,
        answers: [],
        totalScore: 0,
      };
    case 'RECORD_ANSWER':
      return {
        ...state,
        answers: [...state.answers, action.record],
        totalScore: state.totalScore + action.record.pointsEarned,
      };
    case 'NEXT_QUESTION':
      return { ...state, currentIndex: state.currentIndex + 1 };
    case 'RESET':
      return DEFAULT_STATE;
    default:
      return state;
  }
}

function loadFromSession(): GameState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    return parsed.nickname ? parsed : null;
  } catch {
    return null;
  }
}

function saveToSession(state: GameState) {
  if (typeof window === 'undefined') return;
  try {
    if (!state.nickname) {
      sessionStorage.removeItem(SESSION_KEY);
    } else {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    }
  } catch {}
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    () => loadFromSession() ?? DEFAULT_STATE
  );

  useEffect(() => {
    saveToSession(state);
  }, [state]);

  const startGame = useCallback((nickname: string) => {
    dispatch({
      type: 'START',
      nickname,
      questions: pickQuestions(ALL_QUESTIONS, QUESTIONS_PER_ROUND),
    });
  }, []);

  const recordAnswer = useCallback((record: AnswerRecord) => {
    dispatch({ type: 'RECORD_ANSWER', record });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const isFinished =
    state.questions.length > 0 &&
    state.currentIndex >= state.questions.length;

  return (
    <GameContext.Provider
      value={{ state, startGame, recordAnswer, nextQuestion, resetGame, isFinished }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
