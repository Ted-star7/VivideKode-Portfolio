/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        navy:  { DEFAULT: '#1B3A5C', light: '#234B78', dark: '#122840', 50: '#EBF0F6' },
        gold:  { DEFAULT: '#C9A84C', light: '#D4B96A', dark: '#A8882E', 50: '#FBF6E9' },
        slate: { DEFAULT: '#F4F3EF', dark: '#E8E6E0' },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
    }
  },
  plugins: []
}
