import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        "@/assets/scss/main.scss",
    ],
    meta: {
        name: 'viewport', content: 'width=device-width, initial-scale=1',
        title: 'Eduman – Education & Online Courses Vue Nuxt Template',
        link: [
            {
                rel: "shortcut icon",
                type: "image/x-icon",
                href: "/img/favicon.png"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&family=Raleway:wght@300;400;500;600;700;800&display=swap"
            },
        ],
    },
    router: {
        scrollBehavior(to: any, from: any, savedPosition: any) {
          window.scrollTo(0, 0)
          return { x: 0, y: 0 }
        },
      },
    modules: [
        "@nuxtjs/ngrok"
    ]
}) 