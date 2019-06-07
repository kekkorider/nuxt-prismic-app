if (process.env.NODE_ENV !== "production") require("dotenv").config();
const pkg = require("./package");
const Prismic = require("prismic-javascript");
import { initApi, queryForDocType } from "./prismic.config";

module.exports = {
  mode: "universal",

  env: {
    PRISMIC_API_URL: process.env.PRISMIC_API_URL,
    PRISMIC_API_KEY: process.env.PRISMIC_API_KEY
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["@/assets/css/global.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [["@nuxtjs/dotenv", { systemvars: true }]],

  generate: {
    routes: async function() {
      const homepageData = await queryForDocType("homepage");
      const aboutPageData = await queryForDocType("about_page");
      const blogPostsData = await queryForDocType("blog_post");

      const blogPosts = blogPostsData.results.map(payload => ({
        route: `/blog/${payload.uid}`,
        payload
      }));

      return [
        { route: "/", payload: homepageData.results.data },
        { route: "/about", payload: aboutPageData.results.data },
        { route: "/blog", payload: blogPostsData.results.data },
        ...blogPosts
      ];
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
