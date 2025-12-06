import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AzurePracticeQuestions/', // リポジトリ名を設定 (GitHub Pages用)
})
