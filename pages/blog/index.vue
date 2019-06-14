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
import PrismicDOM from 'prismic-dom'
import { queryForDocType, generatePageData } from '@/prismic.config'

export default {
  data() {
    return {
      Dom: PrismicDOM
    }
  },
  async asyncData({ payload }) {
    let data

    if (payload) {
      data = payload.data
    } else {
      const apiData = await queryForDocType('blog_post')
      data = apiData.results
    }
    return generatePageData('blog_page', data)
  }
}
</script>