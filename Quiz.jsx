import React, { useState, useEffect, useCallback } from 'react';
import { LESSONS } from '../data/lessons';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestions(language, category) {
  const cards = LESSONS[language]?.[category] || [];
  if (cards.length < 4) return [];
  return shuffle(cards).slice(0, Math.min(8, cards.length)).map(card => {
    const distractors = shuffle(cards.filter(c => c.id !== card.id))
      .slice(0, 3)
      .map(c => c.translation);
    const choices = shuffle([card.translation, ...distractors]);
    return { question: card.word, pronunciation: card.pronunciation, correct: card.translation, choices };
  });
}

const STATES = { IDLE: 'idle', PLAYING: 'playing', RESULT: 'result' };

export default function Quiz({ language, category, onScoreSaved }) {
  const [state, setState] = useState(STATES.IDLE);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(15);
  const [timerActive, setTimerActive] = useState(false);

  // Timer
  useEffect(() => {
    if (!timerActive || state !== STATES.PLAYING) return;
    if (timer <= 0) {
      handleAnswer(null);
      return;
    }
    const t = setTimeout(() => setTimer(x => x - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, timerActive, state]);

  const startQuiz = () => {
    const qs = buildQuestions(language, category);
    setQuestions(qs);
    setQIndex(0);
    setAnswers([]);
    setSelected(null);
    setTimer(15);
    setTimerActive(true);
    setState(STATES.PLAYING);
  };

  const handleAnswer = useCallback((choice) => {
    if (selected !== null) return;
    setTimerActive(false);
    setSelected(choice);
    const correct = questions[qIndex]?.correct;
    const isCorrect = choice === correct;
    setAnswers(a => [...a, { choice, correct, isCorrect }]);

    setTimeout(() => {
      if (qIndex + 1 >= questions.length) {
        setState(STATES.RESULT);
      } else {
        setQIndex(i => i + 1);
        setSelected(null);
        setTimer(15);
        setTimerActive(true);
      }
    }, 1200);
  }, [selected, qIndex, questions]);

  const score = answers.filter(a => a.isCorrect).length;

  const handleSave = () => {
    onScoreSaved(language, category, score, questions.length);
  };

  if (state === STATES.IDLE) {
    const cards = LESSONS[language]?.[category] || [];
    return (
      <div style={styles.center}>
        <div style={styles.idleCard} className="animate-fadeUp">
          <div style={styles.idleIcon}>🧠</div>
          <h2 style={styles.idleTitle}>Quiz Time!</h2>
          <p style={styles.idleDesc}>
            Test your <strong>{category}</strong> knowledge.<br />
            {Math.min(8, cards.length)} questions · 15 seconds each
          </p>
          {cards.length < 4 ? (
            <p style={{ color: 'var(--terra)', fontSize: '0.9rem' }}>
              Need at least 4 cards to start a quiz.
            </p>
          ) : (
            <button style={styles.startBtn} onClick={startQuiz}>Start Quiz →</button>
          )}
        </div>
      </div>
    );
  }

  if (state === STATES.RESULT) {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪';
    const message = pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good effort!' : 'Keep practicing!';
    return (
      <div style={styles.center}>
        <div style={styles.resultCard} className="animate-fadeUp">
          <div style={styles.resultEmoji}>{emoji}</div>
          <h2 style={styles.resultTitle}>{message}</h2>
          <div style={styles.scoreRing}>
            <div style={styles.scoreNum}>{pct}%</div>
            <div style={styles.scoreLabel}>{score}/{questions.length} correct</div>
          </div>

          <div style={styles.resultBreakdown}>
            {answers.map((a, i) => (
              <div key={i} style={{ ...styles.breakdownItem, borderLeft: `4px solid ${a.isCorrect ? 'var(--sage)' : 'var(--terra)'}` }}>
                <span style={{ fontWeight: 600 }}>{questions[i]?.question}</span>
                <span style={{ color: a.isCorrect ? 'var(--sage)' : 'var(--terra)' }}>
                  {a.isCorrect ? `✓ ${a.correct}` : `✗ ${a.correct}`}
                </span>
              </div>
            ))}
          </div>

          <div style={styles.resultBtns}>
            <button style={styles.saveBtn} onClick={handleSave}>💾 Save Score (+{score * 15} XP)</button>
            <button style={styles.retryBtn} onClick={startQuiz}>↺ Retry</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[qIndex];

  return (
    <div style={styles.quizContainer} className="animate-fadeIn">
      {/* Header */}
      <div style={styles.quizHeader}>
        <div style={styles.qCounter}>{qIndex + 1} / {questions.length}</div>
        <div style={{ ...styles.timerBadge, background: timer <= 5 ? 'var(--terra)' : 'var(--amber)' }}>
          ⏱ {timer}s
        </div>
      </div>

      {/* Timer bar */}
      <div style={styles.timerBar}>
        <div style={{
          ...styles.timerFill,
          width: `${(timer / 15) * 100}%`,
          background: timer <= 5 ? 'var(--terra)' : 'var(--amber)',
          transition: 'width 1s linear, background 0.3s',
        }} />
      </div>

      {/* Question */}
      <div style={styles.questionBox}>
        <div style={styles.questionLabel}>Translate this word</div>
        <div style={styles.questionWord}>{q.question}</div>
        {q.pronunciation && (
          <div style={styles.questionPron}>🔊 {q.pronunciation}</div>
        )}
      </div>

      {/* Choices */}
      <div style={styles.choices}>
        {q.choices.map((choice, i) => {
          let bg = 'var(--white)';
          let color = 'var(--ink)';
          let border = '2px solid var(--cream-dark)';
          if (selected !== null) {
            if (choice === q.correct) { bg = 'var(--sage)'; color = 'var(--white)'; border = '2px solid var(--sage)'; }
            else if (choice === selected) { bg = 'var(--terra)'; color = 'var(--white)'; border = '2px solid var(--terra)'; }
          }
          return (
            <button
              key={i}
              style={{ ...styles.choiceBtn, background: bg, color, border }}
              onClick={() => handleAnswer(choice)}
              disabled={selected !== null}
            >
              <span style={styles.choiceLetter}>{String.fromCharCode(65 + i)}</span>
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  center: { display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' },
  idleCard: {
    background: 'var(--white)', borderRadius: 'var(--radius)',
    padding: '3rem 2.5rem', textAlign: 'center',
    boxShadow: 'var(--shadow-md)', maxWidth: 480, width: '100%',
  },
  idleIcon: { fontSize: '3rem', marginBottom: '1rem' },
  idleTitle: { fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.75rem' },
  idleDesc: { color: 'var(--slate)', lineHeight: 1.7, marginBottom: '2rem' },
  startBtn: {
    background: 'var(--amber)', color: 'var(--white)',
    padding: '14px 36px', borderRadius: 'var(--radius-sm)',
    fontWeight: 600, fontSize: '1rem', cursor: 'pointer',
    transition: 'all 0.2s',
  },
  quizContainer: { width: '100%', maxWidth: 560 },
  quizHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' },
  qCounter: { fontFamily: 'var(--font-mono)', color: 'var(--slate)', fontSize: '0.85rem' },
  timerBadge: {
    color: 'var(--white)', padding: '4px 14px', borderRadius: 100,
    fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.9rem',
    transition: 'background 0.3s',
  },
  timerBar: { height: 5, background: 'var(--cream-dark)', borderRadius: 3, marginBottom: '1.5rem', overflow: 'hidden' },
  timerFill: { height: '100%', borderRadius: 3 },
  questionBox: {
    background: 'var(--white)', borderRadius: 'var(--radius)',
    padding: '2rem', textAlign: 'center', marginBottom: '1.25rem',
    boxShadow: 'var(--shadow-sm)',
  },
  questionLabel: { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--slate-light)', marginBottom: '0.75rem' },
  questionWord: { fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.75rem' },
  questionPron: { fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--slate)', background: 'var(--cream)', padding: '4px 14px', borderRadius: 100, display: 'inline-block' },
  choices: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  choiceBtn: {
    padding: '14px 20px', borderRadius: 'var(--radius-sm)',
    fontWeight: 500, fontSize: '1rem', cursor: 'pointer',
    textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem',
    transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)',
  },
  choiceLetter: {
    width: 28, height: 28, borderRadius: '50%',
    background: 'var(--cream)', color: 'var(--slate)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
    fontFamily: 'var(--font-mono)',
  },
  resultCard: {
    background: 'var(--white)', borderRadius: 'var(--radius)',
    padding: '2.5rem 2rem', textAlign: 'center',
    boxShadow: 'var(--shadow-md)', maxWidth: 520, width: '100%',
  },
  resultEmoji: { fontSize: '3rem', marginBottom: '0.5rem' },
  resultTitle: { fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '1.5rem' },
  scoreRing: {
    background: 'linear-gradient(135deg, var(--amber-pale), var(--cream-dark))',
    borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1.5rem',
  },
  scoreNum: { fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--amber)' },
  scoreLabel: { color: 'var(--slate)', fontWeight: 500 },
  resultBreakdown: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', maxHeight: 200, overflowY: 'auto' },
  breakdownItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 12px', borderRadius: 'var(--radius-sm)',
    background: 'var(--cream)', fontSize: '0.85rem',
  },
  resultBtns: { display: 'flex', gap: '0.75rem' },
  saveBtn: {
    flex: 1, background: 'var(--amber)', color: 'var(--white)',
    padding: '12px', borderRadius: 'var(--radius-sm)',
    fontWeight: 600, cursor: 'pointer',
  },
  retryBtn: {
    background: 'var(--cream-dark)', color: 'var(--ink)',
    padding: '12px 20px', borderRadius: 'var(--radius-sm)',
    fontWeight: 500, cursor: 'pointer',
  },
};
