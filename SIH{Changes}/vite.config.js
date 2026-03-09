import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        engineering: resolve(__dirname, 'org-engineering.html'),
        arts: resolve(__dirname, 'org-arts.html'),
        school: resolve(__dirname, 'org-school.html'),
        other: resolve(__dirname, 'org-other.html'),
      },
    },
  },
});
