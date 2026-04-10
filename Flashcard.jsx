import React, { useState } from 'react';
import { LESSONS } from '../data/lessons';

export default function Flashcard({ language, category, progress, onMaster, onUnmaster }) {
  const cards = LESSONS[language]?.[category] || [];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(null);

  const card = cards[index];
  const mastered = card ? progress.isCardMastered(language, category, card.id) : false;
  const masteredCount = progress.getMasteredCount(language, category);

  const navigate = (dir) => {
    setFlipped(false);
    setDirection(dir);
    setTimeout(() => {
      setIndex(i => dir === 'next'
        ? (i + 1) % cards.length
        : (i - 1 + cards.length) % cards.length
      );
      setDirection(null);
    }, 200);
  };

  if (!card) return <div style={{ padding: '2rem', textAlign: 'center' }}>No cards available.</div>;

  return (
    <div style={styles.container}>
      {/* Progress bar */}
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${(masteredCount / cards.length) * 100}%` }} />
      </div>

      <div style={styles.meta}>
        <span style={styles.counter}>{index + 1} / {cards.length}</span>
        <span style={styles.masteredBadge}>
          ⭐ {masteredCount} mastered
        </span>
      </div>

      {/* Card */}
      <div
        style={{
          ...styles.cardWrap,
          opacity: direction ? 0 : 1,
          transform: direction === 'next' ? 'translateX(-30px)' : direction === 'prev' ? 'translateX(30px)' : 'translateX(0)',
          transition: 'all 0.2s ease',
        }}
        onClick={() => setFlipped(f => !f)}
      >
        <div style={{
          ...styles.card,
          background: flipped
            ? 'linear-gradient(135deg, var(--ink) 0%, var(--ink-light) 100%)'
            : 'var(--white)',
          color: flipped ? 'var(--white)' : 'var(--ink)',
          animation: 'fadeIn 0.3s ease',
        }}>
          {/* Flip hint */}
          <div style={{ ...styles.flipHint, color: flipped ? 'rgba(255,255,255,0.5)' : 'var(--slate-light)' }}>
            {flipped ? '← tap to flip back' : 'tap to reveal →'}
          </div>

          {!flipped ? (
            <div style={styles.frontContent}>
              <div style={styles.wordLabel}>WORD</div>
              <div style={styles.wordText}>{card.word}</div>
              <div style={styles.pronunciation}>🔊 {card.pronunciation || 'N/A'}</div>
            </div>
          ) : (
            <div style={styles.backContent}>
              <div style={{ ...styles.wordLabel, color: 'rgba(255,255,255,0.6)' }}>TRANSLATION</div>
              <div style={{ ...styles.wordText, color: 'var(--amber-light)' }}>{card.translation}</div>
              <div style={styles.divider} />
              <div style={styles.exampleBox}>
                <div style={styles.exampleText}>{card.example}</div>
                <div style={styles.exampleTrans}>{card.exampleTranslation}</div>
              </div>
            </div>
          )}

          {mastered && (
            <div style={styles.masteredStamp}>✓ Mastered</div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.navBtn} onClick={() => navigate('prev')}>← Prev</button>

        <button
          style={{
            ...styles.masterBtn,
            background: mastered ? 'var(--sage)' : 'var(--amber)',
            color: 'var(--white)',
          }}
          onClick={() => mastered
            ? onUnmaster(language, category, card.id)
            : onMaster(language, category, card.id)
          }
        >
          {mastered ? '✓ Mastered' : '⭐ Mark Mastered'}
        </button>

        <button style={styles.navBtn} onClick={() => navigate('next')}>Next →</button>
      </div>

      {/* Dots */}
      <div style={styles.dots}>
        {cards.map((c, i) => (
          <div
            key={c.id}
            style={{
              ...styles.dot,
              background: i === index ? 'var(--amber)' : 'var(--cream-dark)',
              width: i === index ? 20 : 8,
            }}
            onClick={() => { setFlipped(false); setIndex(i); }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%', maxWidth: 600, margin: '0 auto', padding: '0 1rem' },
  progressBar: {
    height: 6, background: 'var(--cream-dark)', borderRadius: 3,
    marginBottom: '1.5rem', overflow: 'hidden',
  },
  progressFill: {
    height: '100%', background: 'linear-gradient(90deg, var(--amber), var(--amber-light))',
    borderRadius: 3, transition: 'width 0.5s ease',
  },
  meta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  counter: { fontFamily: 'var(--font-mono)', color: 'var(--slate)', fontSize: '0.85rem' },
  masteredBadge: {
    background: 'var(--amber-pale)', color: 'var(--amber)',
    padding: '4px 12px', borderRadius: 100, fontSize: '0.8rem', fontWeight: 600,
  },
  cardWrap: { cursor: 'pointer', userSelect: 'none' },
  card: {
    borderRadius: 'var(--radius)', padding: '2.5rem 2rem',
    boxShadow: 'var(--shadow-lg)', minHeight: 280,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
    transition: 'background 0.3s ease, color 0.3s ease',
  },
  flipHint: { fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem', opacity: 0.7 },
  frontContent: { textAlign: 'center' },
  backContent: { textAlign: 'center', width: '100%' },
  wordLabel: {
    fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
    color: 'var(--slate-light)', marginBottom: '0.75rem',
  },
  wordText: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700, marginBottom: '1rem',
  },
  pronunciation: {
    fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
    color: 'var(--slate)', background: 'var(--cream)', padding: '6px 16px',
    borderRadius: 100,
  },
  divider: { height: 1, background: 'rgba(255,255,255,0.15)', margin: '1rem 0' },
  exampleBox: { background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-sm)', padding: '1rem' },
  exampleText: { fontSize: '1rem', fontStyle: 'italic', marginBottom: '0.5rem' },
  exampleTrans: { fontSize: '0.85rem', opacity: 0.65 },
  masteredStamp: {
    position: 'absolute', top: 16, right: 16,
    background: 'var(--sage)', color: 'var(--white)',
    padding: '4px 12px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 600,
  },
  actions: {
    display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center',
    marginTop: '1.5rem',
  },
  navBtn: {
    background: 'var(--white)', color: 'var(--ink)',
    border: '2px solid var(--cream-dark)', borderRadius: 'var(--radius-sm)',
    padding: '10px 20px', fontWeight: 500, fontSize: '0.9rem',
    transition: 'all 0.2s', cursor: 'pointer',
  },
  masterBtn: {
    padding: '10px 24px', borderRadius: 'var(--radius-sm)',
    fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
    transition: 'all 0.2s', flex: 1, maxWidth: 200,
  },
  dots: { display: 'flex', gap: 6, justifyContent: 'center', marginTop: '1.5rem' },
  dot: {
    height: 8, borderRadius: 4, cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};
