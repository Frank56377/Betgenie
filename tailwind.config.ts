import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: '#0A1428',
          'navy-dark': '#050A15',
          blue: '#0066FF',
          'blue-light': '#1E90FF',
          cyan: '#00D4FF',
          gold: '#FFD700',
          'gold-soft': '#F5B800',
        },
        neutral: {
          white: '#FFFFFF',
          'white-soft': '#F8F9FA',
          gray: '#E8E8E8',
          'gray-dark': '#6B7280',
          'text-secondary': '#9CA3AF',
        },
        status: {
          success: '#10B981',
          'success-light': '#D1FAE5',
          warning: '#F59E0B',
          'warning-light': '#FEF3C7',
          error: '#EF4444',
          'error-light': '#FEE2E2',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-base': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 102, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 102, 255, 0.5)',
        'glow-lg': '0 0 30px rgba(0, 212, 255, 0.4)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift': 'drift 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'drift': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
};

export default config;