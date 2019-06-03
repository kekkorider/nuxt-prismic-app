if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const pkg = require('./package')
const Prismic = require('prismic-javascript')
import { initApi } from './prismic.config'

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/global.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [['@nuxtjs/dotenv', { systemvars: true }]],

  generate: {
    routes: function() {
      const homepage = initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'homepage'))
          .then(response => {
            return response.results.map(payload => {
              return {
                route: '/',
                payload
              }
            })
          })
      })

      const aboutPage = initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'about_page'))
          .then(response => {
            return response.results.map(payload => {
              return {
                route: '/about',
                payload
              }
            })
          })
      })

      const blogPage = initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'blog_post'))
          .then(response => {
            return [{
              route: `/blog`,
              payload: response.results
            }]
          })
      })

      const blogPosts = initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'blog_post'))
          .then(response => {
            return response.results.map(payload => {
              return {
                route: `/blog/${payload.uid}`,
                payload
              }
            })
          })
      })

      return Promise.all([homepage, aboutPage, blogPage, blogPosts]).then(values => {
        return [...values[0], ...values[1], ...values[2], ...values[3]]
      })
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
