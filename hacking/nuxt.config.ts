// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  
  devtools: { enabled: true },
  plugins: [
    // Register the global directive plugin
    '~/plugins/globalDirectives.js',
    // Other plugins...
  ],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  routeRules:{
    // Build-time static page generation
    '/': { ssr: false},
    // Client-side rendering (CSR)
    '/XSS': { ssr: false },
  }


})
