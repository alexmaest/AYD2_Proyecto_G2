/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'retro-white': {
          50: '#faf8f0',
          100: '#f3efe0',
          200: '#ded2a9',
          300: '#cdb97c',
          400: '#c1a45e',
          500: '#b68d4a',
          600: '#a0723f',
          700: '#865837',
          800: '#6e4832',
          900: '#5c3c2b',
          950: '#331f15',
          DEFAULT: '#F3EFE0'
        },
        'retro-black': {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#313131',
          950: '#222222',
          DEFAULT: '#222222'
        },
        'retro-green': {
          50: '#f2fbf8',
          100: '#d3f4e8',
          200: '#a6e9d2',
          300: '#72d6b8',
          400: '#45bc9c',
          500: '#2ba183',
          600: '#20816a',
          700: '#1e6758',
          800: '#1b5045',
          900: '#1b463d',
          950: '#0a2924',
          DEFAULT: '#1B5045'
        },
        'retro-orange': {
          50: '#fef8ee',
          100: '#fdefd7',
          200: '#fadbae',
          300: '#f6c17b',
          400: '#f3aa60',
          500: '#ed8022',
          600: '#de6718',
          700: '#b94e15',
          800: '#933e19',
          900: '#763518',
          950: '#40190a',
          DEFAULT: '#F3AA60'
        },
        'retro-blue': {
          50: '#eefafd',
          100: '#d5f1f8',
          200: '#b0e3f1',
          300: '#7acee6',
          400: '#3cafd4',
          500: '#2092ba',
          600: '#1e769c',
          700: '#1d5b79',
          800: '#215069',
          900: '#204459',
          950: '#102b3c',
          DEFAULT: '#1D5B79'
        }
      }
    }
  },
  plugins: []
}
