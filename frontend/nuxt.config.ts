// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image',
    '@pinia/nuxt',
    'nuxt-icon',
    "@vue-macros/nuxt",
    "@vueuse/nuxt",
  ],
  // Auto import from stores directory
  imports: {
	  dirs: ['stores'],
  },
  routeRules: {
    // Build-time static page generation
    '/': { prerender: true },
  },
  typescript: {
    strict: true
  }
});
