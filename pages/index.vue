<template>
  <section class="container">
    <h1>{{ title }}</h1>
    <div>{{ content }}</div>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript'
import { queryForDocType, generatePageData } from '@/prismic.config'

export default {
  async asyncData({ payload }) {
    let data

    if (payload) {
      data = payload.data
    } else {
      const apiData = await queryForDocType('homepage')
      data = apiData.results[0].data
    }
    return generatePageData('homepage', data)
  }
}
</script>
