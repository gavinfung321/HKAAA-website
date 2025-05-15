/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#0a0a0f',
          800: '#111118',
        }
      },
      animation: {
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'aurora': 'aurora 60s linear infinite',
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = Object.entries(flattenColorPalette(theme('colors')))
    .reduce((acc, [key, val]) => ({
      ...acc,
      [`--${key}`]: val,
    }), {});

  addBase({
    ':root': allColors,
  });
}

function flattenColorPalette(colors) {
  return Object.assign(
    {},
    ...Object.entries(colors).flatMap(([key, value]) => {
      if (typeof value === 'object') {
        return Object.entries(value).map(([subKey, color]) => ({
          [key + (subKey === 'DEFAULT' ? '' : `-${subKey}`)]: color,
        }));
      }
      return [{ [key]: value }];
    })
  );
}