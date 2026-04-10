import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️  CHANGE THIS to match your GitHub repo name exactly.
// e.g. repo URL: github.com/john/my-app  →  set: 'my-app'
const REPO_NAME = process.env.VITE_REPO_NAME || 'lingua-learn'

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
})
