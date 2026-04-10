import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'lingua_learn_progress';

const defaultProgress = {
  language: null,
  category: 'Vocabulary',
  masteredCards: {},   // { "es_Vocabulary_1": true }
  quizScores: [],      // [{ date, lang, category, score, total }]
  streak: 0,
  lastStudiedDate: null,
  xp: 0,
};

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch { /* ignore */ }
  }, [progress]);

  // Check & update streak
  useEffect(() => {
    const today = new Date().toDateString();
    if (progress.lastStudiedDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      setProgress(p => ({
        ...p,
        streak: p.lastStudiedDate === yesterday ? p.streak + 1 : (p.lastStudiedDate ? 0 : p.streak),
        lastStudiedDate: today,
      }));
    }
  }, []);

  const setLanguage = useCallback((lang) => {
    setProgress(p => ({ ...p, language: lang }));
  }, []);

  const setCategory = useCallback((cat) => {
    setProgress(p => ({ ...p, category: cat }));
  }, []);

  const masterCard = useCallback((lang, category, id) => {
    const key = `${lang}_${category}_${id}`;
    setProgress(p => {
      const already = p.masteredCards[key];
      return {
        ...p,
        masteredCards: { ...p.masteredCards, [key]: true },
        xp: already ? p.xp : p.xp + 10,
      };
    });
  }, []);

  const unMasterCard = useCallback((lang, category, id) => {
    const key = `${lang}_${category}_${id}`;
    setProgress(p => {
      const updated = { ...p.masteredCards };
      delete updated[key];
      return { ...p, masteredCards: updated };
    });
  }, []);

  const isCardMastered = useCallback((lang, category, id) => {
    return !!progress.masteredCards[`${lang}_${category}_${id}`];
  }, [progress.masteredCards]);

  const getMasteredCount = useCallback((lang, category) => {
    return Object.keys(progress.masteredCards).filter(k => k.startsWith(`${lang}_${category}_`)).length;
  }, [progress.masteredCards]);

  const saveQuizScore = useCallback((lang, category, score, total) => {
    const entry = {
      date: new Date().toLocaleDateString(),
      lang,
      category,
      score,
      total,
      pct: Math.round((score / total) * 100),
    };
    setProgress(p => ({
      ...p,
      quizScores: [entry, ...p.quizScores].slice(0, 20),
      xp: p.xp + score * 15,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  return {
    progress,
    setLanguage,
    setCategory,
    masterCard,
    unMasterCard,
    isCardMastered,
    getMasteredCount,
    saveQuizScore,
    resetProgress,
  };
}
