import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Instrument Serif"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: { marquee: 'marquee 36s linear infinite' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
