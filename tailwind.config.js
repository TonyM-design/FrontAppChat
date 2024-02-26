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
      }
    }
  },
  plugins: []
}
