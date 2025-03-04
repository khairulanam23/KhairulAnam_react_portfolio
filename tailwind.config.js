/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      screens: {

        'sm': '640px', // Small screens
  
        'md': '768px', // Medium screens
  
        'lg': '1440px', // Large screens
  
      },
      colors: {
        // Custom green colors for light theme
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Custom purple colors for dark theme
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#1e1b4b', // Deep purple for backgrounds
        },
      },
      animation: {
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'green': '0 4px 14px 0 rgba(34, 197, 94, 0.2)',
        'purple': '0 4px 14px 0 rgba(168, 85, 247, 0.2)',
      },
      // CSS variables for dynamic theming
      textColor: {
        theme: {
          primary: 'var(--primary-color)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        }
      },
      backgroundColor: {
        theme: {
          primary: 'var(--primary-color)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          base: 'var(--bg-color)',
        }
      },
    },
  },
  plugins: [],
}