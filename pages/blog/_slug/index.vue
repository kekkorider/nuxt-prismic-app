<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div>{{ content }}</div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import { initApi, generatePageData } from '@/prismic.config'

export default {
  async asyncData({ payload, params }) {
    let data

    if (payload) {
      data = payload.data
    } else {
      const apiData = await initApi()
      const queried = await apiData.query(
        Prismic.Predicates.at('my.blog_post.uid', params.slug)
        )
      data = queried.results[0].data
    }
    return generatePageData('blog_post', data)
  }
}
</script>