import React from 'react';
import { LESSONS, LANGUAGES, CATEGORIES } from '../data/lessons';

export default function Progress({ progress, onReset }) {
  const lang = LANGUAGES.find(l => l.code === progress.progress.language);
  const scores = progress.progress.quizScores;
  const xp = progress.progress.xp;
  const streak = progress.progress.streak;

  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;

  const totalCards = CATEGORIES.reduce((sum, cat) => {
    return sum + (LESSONS[progress.progress.language]?.[cat]?.length || 0);
  }, 0);

  const totalMastered = Object.keys(progress.progress.masteredCards).filter(k =>
    k.startsWith(`${progress.progress.language}_`)
  ).length;

  return (
    <div style={styles.container} className="animate-fadeUp">
      {/* Level & XP */}
      <div style={styles.xpCard}>
        <div style={styles.xpLeft}>
          <div style={styles.levelBadge}>Lv. {level}</div>
          <div style={styles.xpLabel}>Language Learner</div>
        </div>
        <div style={styles.xpRight}>
          <div style={styles.xpAmount}>{xp} XP</div>
          <div style={styles.xpBar}>
            <div style={{ ...styles.xpFill, width: `${xpInLevel}%` }} />
          </div>
          <div style={styles.xpNext}>{100 - xpInLevel} XP to next level</div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        {[
          { label: 'Day Streak', value: streak || 1, icon: '🔥' },
          { label: 'Cards Mastered', value: `${totalMastered}/${totalCards}`, icon: '⭐' },
          { label: 'Quizzes Taken', value: scores.length, icon: '🧠' },
          { label: 'Best Score', value: scores.length ? Math.max(...scores.map(s => s.pct)) + '%' : '—', icon: '🏆' },
        ].map(stat => (
          <div key={stat.label} style={styles.statCard}>
            <div style={styles.statIcon}>{stat.icon}</div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Category Progress</h3>
        <div style={styles.categoryList}>
          {CATEGORIES.map(cat => {
            const total = LESSONS[progress.progress.language]?.[cat]?.length || 0;
            const mastered = progress.getMasteredCount(progress.progress.language, cat);
            const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
            return (
              <div key={cat} style={styles.catItem}>
                <div style={styles.catHeader}>
                  <span style={styles.catName}>{cat}</span>
                  <span style={styles.catCount}>{mastered}/{total}</span>
                </div>
                <div style={styles.catBar}>
                  <div style={{ ...styles.catFill, width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz history */}
      {scores.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Quiz History</h3>
          <div style={styles.historyList}>
            {scores.slice(0, 8).map((s, i) => (
              <div key={i} style={styles.historyItem}>
                <div style={styles.historyLeft}>
                  <span style={styles.historyDate}>{s.date}</span>
                  <span style={styles.historyCategory}>{s.category}</span>
                </div>
                <div style={{
                  ...styles.historyScore,
                  color: s.pct >= 80 ? 'var(--sage)' : s.pct >= 60 ? 'var(--amber)' : 'var(--terra)',
                }}>
                  {s.score}/{s.total} ({s.pct}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      <button style={styles.resetBtn} onClick={() => {
        if (window.confirm('Reset all progress? This cannot be undone.')) onReset();
      }}>
        🗑 Reset All Progress
      </button>
    </div>
  );
}

const styles = {
  container: { width: '100%', maxWidth: 640, margin: '0 auto' },
  xpCard: {
    background: 'linear-gradient(135deg, var(--ink) 0%, var(--ink-light) 100%)',
    borderRadius: 'var(--radius)', padding: '1.75rem',
    display: 'flex', gap: '1.5rem', alignItems: 'center',
    marginBottom: '1.25rem', color: 'var(--white)',
  },
  xpLeft: { flexShrink: 0 },
  levelBadge: {
    background: 'var(--amber)', color: 'var(--white)',
    fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
    width: 72, height: 72, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  xpLabel: { color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textAlign: 'center', marginTop: 6 },
  xpRight: { flex: 1 },
  xpAmount: { fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--amber-light)', marginBottom: '0.5rem' },
  xpBar: { height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 4, marginBottom: '0.5rem' },
  xpFill: { height: '100%', background: 'var(--amber)', borderRadius: 4, transition: 'width 0.6s ease' },
  xpNext: { color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' },
  statCard: {
    background: 'var(--white)', borderRadius: 'var(--radius-sm)',
    padding: '1.25rem 0.75rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)',
  },
  statIcon: { fontSize: '1.5rem', marginBottom: '0.5rem' },
  statValue: { fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.25rem' },
  statLabel: { color: 'var(--slate)', fontSize: '0.75rem', fontWeight: 500 },
  section: { background: 'var(--white)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1.25rem', boxShadow: 'var(--shadow-sm)' },
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--ink)' },
  categoryList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  catItem: {},
  catHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' },
  catName: { fontWeight: 600, color: 'var(--ink)' },
  catCount: { fontFamily: 'var(--font-mono)', color: 'var(--slate)', fontSize: '0.85rem' },
  catBar: { height: 8, background: 'var(--cream-dark)', borderRadius: 4, overflow: 'hidden' },
  catFill: { height: '100%', background: 'linear-gradient(90deg, var(--amber), var(--amber-light))', borderRadius: 4, transition: 'width 0.6s ease' },
  historyList: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  historyItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 14px', background: 'var(--cream)', borderRadius: 'var(--radius-sm)',
  },
  historyLeft: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
  historyDate: { color: 'var(--slate)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' },
  historyCategory: { color: 'var(--ink)', fontWeight: 500, fontSize: '0.9rem' },
  historyScore: { fontWeight: 700, fontFamily: 'var(--font-mono)' },
  resetBtn: {
    width: '100%', background: 'transparent',
    border: '2px solid var(--cream-dark)', color: 'var(--slate)',
    padding: '12px', borderRadius: 'var(--radius-sm)',
    fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
    fontSize: '0.9rem',
  },
};
