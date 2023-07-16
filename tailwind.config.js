/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      display: ['Roboto'],
      body: ['Roboto'],
    },
    extend: {
      colors: {
        'custom-color-gold': '#FF9F24',
        'custom-color-light-gold': '#F1F2A1FA',
        'custom-color-icon-no-selected': '#FFFFFCB2',
        'custom-color-bg-page': '#F6F7FE',
      },
      gridTemplateColumns: {
        sidebar: '140px auto',
      },
      gridTemplateRows: {
        header: '98px auto',
      },
      fontSize: {
        'hero': '2.5rem',       // 40px
        'promo': '1.875rem',    // 30px
        'title': '1.5625rem',   // 25px
        'subtitle': '1.25rem',  // 20px
        'general': '1rem',      // 16px
      }
    },
  },
  plugins: [],
};