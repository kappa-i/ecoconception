// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  nitro: {
    prerender: {
      // Pages liées depuis l'accueil mais pas encore créées : à retirer au fur et à mesure.
      ignore: [
        '/questionnaire', '/activites', '/regions', '/recherche', '/agenda',
        '/a-propos', '/accessibilite', '/mentions-legales', '/contact',
        '/de/', '/it/', '/en/'
      ]
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Suisse Tourisme — La Suisse, sans aller loin',
      meta: [
        {
          name: 'description',
          content: 'Quelques questions, et on vous emmène directement vers les bonnes activités en Suisse.'
        }
      ]
    }
  }
})
