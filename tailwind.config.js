/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				customBlue: '#4F46E5',
				lightGrey: '#D3D3D3',
				darkRussian: '#111827',
				ebony: '#313338',
				midnight: '#1F2937',
				darkBb: '#121212',
				warmGray: '#CCCCCC'
			},

			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};

