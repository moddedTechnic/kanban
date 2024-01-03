// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'KanBan'
    }
  },
  typescript: {
    shim: false
  },
  ssr: false
})
