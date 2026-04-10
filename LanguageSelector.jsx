import React from 'react';
import { LANGUAGES } from '../data/lessons';

export default function LanguageSelector({ onSelect }) {
  return (
    <div style={styles.container}>
      {/* Decorative background */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />

      <div style={styles.inner}>
        <div style={styles.badge} className="animate-fadeUp">Language Learning</div>

        <h1 style={styles.title} className="animate-fadeUp">
          Choose Your<br />
          <em style={{ color: 'var(--amber)' }}>Language</em>
        </h1>

        <p style={styles.subtitle} className="animate-fadeUp">
          Master vocabulary, grammar & phrases with<br />daily flashcards and smart quizzes.
        </p>

        <div style={styles.grid}>
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.code}
              style={{
                ...styles.card,
                animationDelay: `${i * 0.1}s`,
                '--accent': lang.color,
              }}
              className="animate-fadeUp lang-card"
              onClick={() => onSelect(lang.code)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 20px 50px ${lang.color}30`;
                e.currentTarget.style.borderColor = lang.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={styles.flagWrap}>
                <span style={styles.flag}>{lang.flag}</span>
              </div>
              <div style={styles.langName}>{lang.name}</div>
              <div style={{ ...styles.langAccent, background: lang.color }} />
            </button>
          ))}
        </div>

        <div style={styles.features} className="animate-fadeIn">
          {['📚 Daily Lessons', '🃏 Flashcards', '🧠 Smart Quizzes', '📈 Track Progress'].map(f => (
            <span key={f} style={styles.feature}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--cream)',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem',
  },
  bgOrb1: {
    position: 'absolute', top: '-10%', right: '-5%',
    width: 500, height: 500, borderRadius: '50%',
    background: 'radial-gradient(circle, #F0A83025, transparent 70%)',
    pointerEvents: 'none',
  },
  bgOrb2: {
    position: 'absolute', bottom: '-15%', left: '-5%',
    width: 400, height: 400, borderRadius: '50%',
    background: 'radial-gradient(circle, #C0583A20, transparent 70%)',
    pointerEvents: 'none',
  },
  inner: {
    maxWidth: 720, width: '100%', textAlign: 'center', position: 'relative',
  },
  badge: {
    display: 'inline-block',
    background: 'var(--amber-pale)', color: 'var(--amber)',
    fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 500,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    padding: '6px 16px', borderRadius: 100,
    border: '1px solid var(--amber-light)',
    marginBottom: '1.5rem',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    lineHeight: 1.15, fontWeight: 700,
    color: 'var(--ink)', marginBottom: '1.25rem',
  },
  subtitle: {
    fontSize: '1.1rem', color: 'var(--slate)',
    lineHeight: 1.7, marginBottom: '3rem',
    fontWeight: 300,
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.25rem', marginBottom: '2.5rem',
    maxWidth: 480, margin: '0 auto 2.5rem',
  },
  card: {
    background: 'var(--white)',
    borderRadius: 'var(--radius)',
    padding: '2rem 1.5rem',
    border: '2px solid transparent',
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '0.75rem',
    position: 'relative', overflow: 'hidden',
  },
  flagWrap: {
    width: 64, height: 64, borderRadius: '50%',
    background: 'var(--cream)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  flag: { fontSize: '2rem' },
  langName: {
    fontFamily: 'var(--font-display)', fontSize: '1.25rem',
    fontWeight: 700, color: 'var(--ink)',
  },
  langAccent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 4, borderRadius: '0 0 var(--radius) var(--radius)',
  },
  features: {
    display: 'flex', flexWrap: 'wrap',
    gap: '0.75rem', justifyContent: 'center',
    animationDelay: '0.5s',
  },
  feature: {
    background: 'var(--white)', color: 'var(--ink-light)',
    padding: '6px 14px', borderRadius: 100,
    fontSize: '0.85rem', fontWeight: 500,
    boxShadow: 'var(--shadow-sm)',
  },
};
