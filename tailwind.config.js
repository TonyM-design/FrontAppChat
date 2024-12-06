/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        'slide-top': 'slide-top 0.6s cubic-bezier(0.175, 0.885, 0.320, 1.275)   both',
        'tofull' :  'tofull 2s ease-in-out forwards ',
        'pulse2': 'pulse2 2s cubic-bezier(0.4, 0, 0.6, 1)',
        'pulse3':'pulse3 2s cubic-bezier(0.4, 0, 0.6, 1)'
      },
      keyframes: {
        'slide-top': {
          '0%': {
            transform: 'translateY(20vh)'
          },
          to: {
            transform: 'translateY(0px)'
          }
        },




        'tofull': {
          '0%': { height: '20%' }, // 14rem est équivalent à h-56
          '100%': { height: '100%' } // h-full
        }
      ,


        'pulse2': {
          '0%, 49%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 0, display: 'none' }

      },



        'pulse3': {
          '0%, 49%': {  backgroundColor: '#ef4444' },
          '50%': {  backgroundColor: '#10b981'},
          '100%': { backgroundColor: '#ef4444' }
        }




    }
  },
  plugins: [require('tailwindcss-animated')]
}}
