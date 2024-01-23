const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				black: colors.black,
				white: colors.white,
				emerald: colors.emerald,
				indigo: colors.indigo,
				yellow: colors.yellow,
				stone: colors.warmGray,
				sky: colors.sky,
				cyan: colors.cyan,
				neutral: colors.trueGray,
				gray: colors.coolGray,
				slate: colors.blueGray,
				lime: colors.lime,
				rose: colors.rose,
				slate: colors.slate,
				zinc: colors.zinc,
			},
			safelist: [
				'animate-[fade-in_1s_ease-in-out]',
				'animate-[fade-in-down_1s_ease-in-out]',
			],
		},
	},
	plugins: [],
};
