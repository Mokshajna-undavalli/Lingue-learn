import React, { useState } from 'react';
import { LANGUAGES, CATEGORIES } from './data/lessons';
import { useProgress } from './hooks/useProgress';
import LanguageSelector from './components/LanguageSelector';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';
import Progress from './components/Progress';

const TABS = [
  { id: 'flashcard', label: 'Flashcards', icon: '🃏' },
  { id: 'quiz', label: 'Quiz', icon: '🧠' },
  { id: 'progress', label: 'Progress', icon: '📈' },
];

export default function App() {
  const [tab, setTab] = useState('flashcard');
  const prog = useProgress();
  const { progress, setLanguage, setCategory, masterCard, unMasterCard,
          isCardMastered, getMasteredCount, saveQuizScore, resetProgress } = prog;

  const lang = LANGUAGES.find(l => l.code === progress.language);

  if (!progress.language) {
    return <LanguageSelector onSelect={setLanguage} />;
  }

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoMark}>L</span>
            <span style={styles.logoText}>LinguaLearn</span>
          </div>

          <div style={styles.langPill}>
            <span>{lang?.flag}</span>
            <span style={{ fontWeight: 600 }}>{lang?.name}</span>
            <button
              style={styles.changeLangBtn}
              onClick={() => setLanguage(null)}
              title="Change language"
            >✕</button>
          </div>

          <div style={styles.xpBadge}>
            ⚡ {progress.xp} XP
          </div>
        </div>
      </header>

      {/* Category selector */}
      <div style={styles.catBar}>
        <div style={styles.catBarInner}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              style={{
                ...styles.catBtn,
                background: progress.category === cat ? 'var(--amber)' : 'transparent',
                color: progress.category === cat ? 'var(--white)' : 'var(--slate)',
                fontWeight: progress.category === cat ? 600 : 400,
              }}
              onClick={() => setCategory(cat)}
            >
              {cat}
              <span style={styles.catCount}>
                {getMasteredCount(progress.language, cat)}/
                {tab === 'progress' ? '' : ''}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main style={styles.main}>
        <div style={styles.content}>
          {tab === 'flashcard' && (
            <Flashcard
              language={progress.language}
              category={progress.category}
              progress={{ isCardMastered, getMasteredCount }}
              onMaster={masterCard}
              onUnmaster={unMasterCard}
            />
          )}
          {tab === 'quiz' && (
            <Quiz
              language={progress.language}
              category={progress.category}
              onScoreSaved={saveQuizScore}
            />
          )}
          {tab === 'progress' && (
            <Progress
              progress={{ progress, getMasteredCount }}
              onReset={resetProgress}
            />
          )}
        </div>
      </main>

      {/* Bottom Nav */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          {TABS.map(t => (
            <button
              key={t.id}
              style={{
                ...styles.navBtn,
                color: tab === t.id ? 'var(--amber)' : 'var(--slate)',
                borderTop: tab === t.id ? '3px solid var(--amber)' : '3px solid transparent',
              }}
              onClick={() => setTab(t.id)}
            >
              <span style={styles.navIcon}>{t.icon}</span>
              <span style={styles.navLabel}>{t.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    background: 'var(--cream)',
  },
  header: {
    background: 'var(--white)', borderBottom: '1px solid var(--cream-dark)',
    position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)',
  },
  headerInner: {
    maxWidth: 800, margin: '0 auto',
    padding: '0.875rem 1.5rem',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  logoMark: {
    width: 36, height: 36, borderRadius: 10,
    background: 'var(--ink)', color: 'var(--amber)',
    fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoText: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)' },
  langPill: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    background: 'var(--cream)', borderRadius: 100, padding: '6px 14px',
    fontSize: '0.9rem', color: 'var(--ink)',
  },
  changeLangBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: 'var(--slate)', fontSize: '0.85rem', padding: '0 2px',
    lineHeight: 1,
  },
  xpBadge: {
    background: 'var(--amber-pale)', color: 'var(--amber)',
    padding: '6px 14px', borderRadius: 100,
    fontWeight: 600, fontSize: '0.85rem', fontFamily: 'var(--font-mono)',
  },
  catBar: {
    background: 'var(--white)', borderBottom: '1px solid var(--cream-dark)',
  },
  catBarInner: {
    maxWidth: 800, margin: '0 auto',
    padding: '0.5rem 1.5rem',
    display: 'flex', gap: '0.25rem',
  },
  catBtn: {
    padding: '8px 20px', borderRadius: 100, border: 'none',
    cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s',
    display: 'flex', alignItems: 'center', gap: '0.4rem',
  },
  catCount: {
    fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
    opacity: 0.7,
  },
  main: {
    flex: 1, padding: '1.5rem 1rem 5rem',
    display: 'flex', justifyContent: 'center',
  },
  content: { width: '100%', maxWidth: 800 },
  nav: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: 'var(--white)', borderTop: '1px solid var(--cream-dark)',
    boxShadow: '0 -4px 20px rgba(26,21,16,0.08)',
    zIndex: 100,
  },
  navInner: {
    maxWidth: 800, margin: '0 auto',
    display: 'flex', justifyContent: 'space-around',
    padding: '0.25rem 0',
  },
  navBtn: {
    flex: 1, background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '0.625rem 0', transition: 'all 0.2s',
  },
  navIcon: { fontSize: '1.35rem', marginBottom: '0.2rem' },
  navLabel: { fontSize: '0.72rem', fontWeight: 500 },
};
