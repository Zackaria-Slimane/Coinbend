/** @type {import('tailwindcss').Config} */
module.exports = {
	exclude: [".nuxt"],
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
	],
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				title: ["Righteous", "sans-serif"],
				sub: ["Roboto Condensed", "sans-serif"],
			},
		},
	},

	plugins: [require("@tailwindcss/forms")],
};
