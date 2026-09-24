/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#05060a',
        surface: '#0b0d14',
        line: 'rgba(255,255,255,0.08)',
        accent: '#5ef2ff',
        warm: '#ffb86b',
        ink: { DEFAULT: '#f2f4f8', muted: '#a6adbb', dim: '#6b7280' },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: { page: '72rem' },
    },
  },
  plugins: [],
};
