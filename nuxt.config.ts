// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "nuxt-headlessui"],
	runtimeConfig: {
		supabaseKey: process.env.SUPABASE_KEY,
		supabaseUri: process.env.SUPABASE_URL,
	},
	css: [
		"@/assets/css/tailwind.css",
		"primevue/resources/themes/tailwind-light/theme.css",
		"primevue/resources/primevue.css",
		"primeicons/primeicons.css",
	],
	build: {
		transpile: ["primevue"],
	},
	tailwindcss: {
		configPath: "@/tailwind.config.js",
		exposeConfig: true,
	},
	nitro: {
		compressPublicAssets: {
			gzip: true,
			brotli: true,
		},
		minify: true,
	},
	ssr: true,
	app: {
		head: {
			title: "Coinbend - Get a hold of your spendings",
			htmlAttrs: {
				lang: "en",
			},
			meta: [
				{ name: "description", content: "Budgeting app and expenses tracking" },
				{ name: "application-name", content: "Coindbend" },
				{ name: "apple-mobile-web-app-title", content: "Coinbend" },
				{ name: "theme-color", content: "#ffffff" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ charset: "utf-8" },
			],
			link: [
				{ rel: "icon", href: "./favicon.ico" },
				{ rel: "manifest", href: "./site.webmanifest" },
				{ rel: "apple-touch-icon", sizes: "180x180", href: "./apple-touch-icon.png" },
				{ rel: "icon", type: "image/png", sizes: "32x32", href: "./favicon-32x32.png" },
				{ rel: "icon", type: "image/png", sizes: "16x16", href: "./favicon-16x16.png" },
				{ rel: "mask-icon", href: "./safari-pinned-tab.svg", color: "#5bbad5" },
				{ rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossorigin: "anonymous",
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Righteous&family=Roboto+Condensed:wght@400&display=swap",
				},
			],
		},
	},
});
