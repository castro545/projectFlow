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
        'custom-color-dark-blue': '#0D0D51',
        'custom-color-pink': '#ed0092',
        'custom-color-purple': '#7700bc',
        'custom-color-cyan': '#3fdff0',
        'custom-color-lime': '#7ed321',
        'custom-color-gray': '#84818A',
        'custom-color-very-light-gray': '#E3E3E3',
        'custom-color-light-gray': '#DCDBDD',
        'custom-color-light-gray-disable': '#F2F2F2',
        'custom-color-light-gray-blue': '#E5EAF7',
        'custom-color-dark-gray': '#47464A',
        'custom-color-background-gray': '#F7F8FB',
        'custom-color-aqua': '#50E3C2',
        'custom-color-black': '#202020',
        'custom-color-green': '#009580',
        'custom-color-lavender': '#BEC2FF'
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