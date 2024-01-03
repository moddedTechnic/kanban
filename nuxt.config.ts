export default defineNuxtConfig({
  app: {
    head: {
      title: 'KanBan',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'A KanBan system' }
      ]
    }
  },
  typescript: {
    shim: false
  },
  ssr: false
})
