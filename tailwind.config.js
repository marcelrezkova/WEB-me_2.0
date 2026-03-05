/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0a0a0a',
          card: '#111111',
          elevated: '#1a1a1a',
          border: '#222222',
          'border-glow': '#333333',
        },
        neon: {
          cyan: '#00ffff',
          green: '#39ff14',
          purple: '#bf5af2',
          pink: '#ff2d55',
        },
        'text-primary': '#e5e5e5',
        'text-secondary': '#888888',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.15), 0 0 60px rgba(0, 255, 255, 0.05)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.15), 0 0 60px rgba(57, 255, 20, 0.05)',
        'glow-purple': '0 0 20px rgba(191, 90, 242, 0.15), 0 0 60px rgba(191, 90, 242, 0.05)',
        'glow-pink': '0 0 20px rgba(255, 45, 85, 0.15), 0 0 60px rgba(255, 45, 85, 0.05)',
      },
    },
  },
  plugins: [],
};
