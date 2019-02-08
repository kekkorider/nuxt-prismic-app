<template>
  <div class="container">
    <h1>Blog page</h1>
    <hr>
    <article class="post" v-for="(post, index) in posts" :key="index">
      <header>
        <h1>
          <nuxt-link :to="`/blog/${post.uid}`">{{ Dom.RichText.asText(post.data.title) }}</nuxt-link>
        </h1>
      </header>
    </article>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { initApi, generatePageData } from '@/prismic.config'

export default {
  data() {
    return {
      Dom: PrismicDOM
    }
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData('blog_page', context.payload)
    } else {
      return initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'blog_post'))
          .then(response => {
            return generatePageData('blog_page', response.results)
          })
      })
    }
  }
}
</script>