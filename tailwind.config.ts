import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          muted: 'rgba(201,168,76,0.3)',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          card: '#111111',
          deeper: '#050505',
        },
        'amg-red': '#CC0000',
        'eq-blue': '#0066CC',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'marquee': 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config
