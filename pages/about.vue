<template>
  <section class="container">
    <h1>{{ title }}</h1>
    <div>{{ content }}</div>
  </section>
</template>

<script>
import { queryForDocType, generatePageData } from '@/prismic.config'

export default {
  async asyncData({ payload }) {
    let data

    if (payload) {
      data = payload.data
    } else {
      const apiData = await queryForDocType('about_page')
      data = apiData.results[0].data
    }
    return generatePageData('about_page', data)
  }
}
</script>
