/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			colors: {
				main: '#078D99',
				'main-light': '#089ba5'
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms')
		// ...
	]
};
