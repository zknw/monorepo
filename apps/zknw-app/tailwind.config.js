const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f131d',
      },
      boxShadow: {
        'avatar': '0px 0px 14.7px -3px theme("colors.) #E0438F, 0px 0px 52.2px -9px #BD1F5F, 0px 0px 10px -5px rgba(255, 133, 178, 0.70)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(closest-side at center, var(--tw-gradient-from), var(--tw-gradient-to))',
      }
    },
  },
  plugins: [
    plugin(({ theme, addUtilities }) => {
      const neonUtilities = {}
      const colors = theme('colors')
      for (const color in colors) {
        if (typeof colors[color] === 'object') {
          const [dark, main, bright] = [
            colors[color]['800'],
            colors[color]['500'],
            colors[color]['300'],
          ]
          neonUtilities[`.neon-${color}`] = {
            boxShadow: `0 0 2px 0px ${bright}, 0 0 25px -5px ${main}, 0 0 55px -10px ${dark}`,
          }
        }
      }

      addUtilities(neonUtilities)
    })
  ],
};
