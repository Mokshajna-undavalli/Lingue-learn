# 🌍 LinguaLearn — Interactive Language Learning App

A modern, responsive language learning app built with React + Vite. Features flashcards, timed quizzes, and progress tracking across 4 languages.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🌐 Languages | Spanish, French, Japanese, Hindi |
| 🃏 Flashcards | Flip cards with word, translation, pronunciation & example sentence |
| 🧠 Quizzes | 15-second timed multiple-choice quizzes |
| 📊 Progress | XP system, streaks, mastered card tracking, quiz history |
| 💾 Storage | All data persisted in `localStorage` (no backend needed) |
| 📱 Responsive | Works on mobile, tablet & desktop |

---

## 🚀 Quick Start (Local)

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/lingua-learn.git
cd lingua-learn

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open http://localhost:5173/lingua-learn/
```

---

## 🏗 Project Structure

```
lingua-learn/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Auto-deploy to GitHub Pages
├── src/
│   ├── components/
│   │   ├── LanguageSelector.jsx  # Landing / language picker
│   │   ├── Flashcard.jsx         # Flip card study mode
│   │   ├── Quiz.jsx              # Timed quiz with MCQ
│   │   └── Progress.jsx          # Stats & history dashboard
│   ├── data/
│   │   └── lessons.js            # All vocabulary/grammar/phrase data
│   ├── hooks/
│   │   └── useProgress.js        # localStorage progress hook
│   ├── App.jsx                   # Main layout + routing
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles + CSS variables
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📦 Build for Production

```bash
npm run build
# Output goes to /dist
```

---

## 🌐 GitHub Pages Deployment (Step-by-Step)

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) → **New repository**
2. Name it `lingua-learn`
3. Set to **Public**
4. Do NOT initialize with README (you already have files)

### Step 2 — Push Your Code

```bash
cd lingua-learn

git init
git add .
git commit -m "Initial commit: LinguaLearn app"

git remote add origin https://github.com/YOUR_USERNAME/lingua-learn.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

### Step 4 — Trigger Deployment

The `.github/workflows/deploy.yml` will automatically run on every push to `main`.

- Check progress: **Actions** tab → `Deploy to GitHub Pages`
- Your app will be live at: `https://YOUR_USERNAME.github.io/lingua-learn/`

---

## 🎨 Tech Stack

- **React 18** — UI
- **Vite 5** — Build tool
- **localStorage** — Progress persistence
- **Google Fonts** — Playfair Display + DM Sans
- **CSS Variables** — Design system
- **GitHub Actions** — CI/CD

---

## 📝 Adding New Words

Edit `src/data/lessons.js`. Each card follows this shape:

```js
{
  id: 19,                          // unique number
  word: 'Libro',                   // word in target language
  translation: 'Book',            // English translation
  pronunciation: 'LEE-broh',      // phonetic guide
  example: 'Este libro es bueno.', // example sentence
  exampleTranslation: 'This book is good.'
}
```

---

## 📄 License

MIT
