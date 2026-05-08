const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://ebac-agenda-contatos-tan.vercel.app',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    setupNodeEvents(on, config) {},
  },
})
