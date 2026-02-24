import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'ge-green': "#4ead39",
        'ge-green-2': "#4ead391e",
        'ge-gray-1': "#323333",
        'ge-gray-2': "#b3b2b2",
        'ge-gray-3': "#a1a0a0",
        'ge-gray-4': "#eaeae9",
        'ge-gray-5': "#f9f9f9", // background color
        'ge-yellow': "#fccd22",
        'ge-red': "#e51320"
      },
      fontFamily: {
        gilroy: ['var(--font-gilroy)']
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
export default config
