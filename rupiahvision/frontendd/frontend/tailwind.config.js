/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--c-ink)',
        surface: {
          DEFAULT: 'var(--c-surface)',
          raised: 'var(--c-surface-raised)',
          hover: 'var(--c-surface-hover)',
        },
        line: 'var(--c-line)',
        thread: {
          teal: '#1F8A70',
          tealSoft: '#2BAE8F',
          gold: '#C9A24B',
          maroon: '#9C3B3B',
        },
        text: {
          primary: 'var(--c-text-primary)',
          muted: 'var(--c-text-muted)',
          faint: 'var(--c-text-faint)',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.5)',
        glow: '0 0 0 1px rgba(43,174,143,0.25), 0 0 24px -4px rgba(43,174,143,0.35)',
      },
      backgroundImage: {
        thread: 'linear-gradient(180deg, #2BAE8F 0%, #C9A24B 100%)',
      },
    },
  },
  plugins: [],
}
