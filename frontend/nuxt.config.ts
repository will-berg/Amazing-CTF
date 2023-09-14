// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  routeRules: {
    // Build-time static page generation
    '/': { prerender: true },
    // Server-side rendering (default)
    '/cat': { ssr: true },
    // Client-side rendering
    '/test/**': { ssr: false },
  }
})
