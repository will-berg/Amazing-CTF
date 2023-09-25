// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image',
	'@pinia/nuxt',
  	'nuxt-vuefire',
	'nuxt-icon'
  ],
  // Auto import from stores directory
  imports: {
	dirs: ['stores'],
  },
  routeRules: {
    // Build-time static page generation
    '/': { prerender: true },
    // Client-side rendering (CSR)
    '/cat': { ssr: false },
    // Server-side rendering (SSR)
    '/test/**': { ssr: true },
  },
  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
})
