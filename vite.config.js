import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH is set by the GitHub Pages workflow to "/<repo-name>/" so built
// asset URLs resolve under a project site. Falls back to "/" for local dev
// and for a custom-domain or <user>.github.io root deployment.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
