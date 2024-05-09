/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        'slide-top':
          'slide-top 0.6s cubic-bezier(0.175, 0.885, 0.320, 1.275)   both'
      },
      keyframes: {
        'slide-top': {
          '0%': {
            transform: 'translateY(20vh)'
          },
          to: {
            transform: 'translateY(0px)'
          }
        }
      },
      keyframes: {
        pulse2: {
          '0%, 49%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 0, display: 'none' }
        }
      },
      animation: {
        pulse2: 'pulse2 2s cubic-bezier(0.4, 0, 0.6, 1) '
      }
    }
  },
  plugins: [require('tailwindcss-animated')]
}
