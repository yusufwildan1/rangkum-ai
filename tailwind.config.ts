import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code': {
              backgroundColor: 'transparent',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
