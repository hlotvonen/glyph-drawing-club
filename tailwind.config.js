module.exports = {
	purge: [
		"./src/**/*.html",
		"./src/**/*.js",
	],
	darkMode: "media", // or 'media' or 'class'
	theme: {
		fontSize: {
			xs: ["10px", "10px"],
			sm: ["12px", "12px"],
			base: ["14px", "14px"],
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			blue: {
				light: "#3870be",
				DEFAULT: "#593084",
				dark: "#160712",
			},
			violet: {
				light: "#a93130",
				DEFAULT: "#7a1338",
				dark: "#160712",
			},
			green: {
				light: "#91a47a",
				DEFAULT: "#5d7643",
				dark: "#4d533a",
			},
			darkgreen: {
				light: "#5d7643",
				DEFAULT: "#4d533a",
				dark: "#26201d",
			},
			pink: {
				light: "#917692",
				DEFAULT: "#834664",
				dark: "#7a1338",
			},
			red: {
				light: "#834664",
				DEFAULT: "#7a1338",
				dark: "#160712",
			},
			orange: {
				light: "#e0a46e",
				DEFAULT: "#a93130",
				dark: "#7a1338",
			},
			black: {
				light: "#26201d",
				DEFAULT: "#160712",
			},
			gray: {
				light: "#8f9389",
				DEFAULT: "#52534c",
				dark: "#26201d",
			},
			lightgray: {
				light: "#cbd1be",
				DEFAULT: "#8f9389",
				dark: "#52534c",
			},
			white: {
				light: "#e0a46e",
				DEFAULT: "#cbd1be",
				dark: "#8f9389",
			},
			yellow: {
				light: "#cbd1be",
				DEFAULT: "#e0a46e",
				dark: "#a93130",
			}
		},
		extend: {
			fontFamily: {
				mono: ["Pixelated MS Sans Serif", "monospace"]
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
