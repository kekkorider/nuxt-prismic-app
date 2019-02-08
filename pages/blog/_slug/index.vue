<template>
  <div>
    <h1>{{ title }}</h1>
    <div>{{ content }}</div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import { initApi, generatePageData } from '@/prismic.config'

export default {
  asyncData(context) {
    if (context.payload) {
      return generatePageData('blog_post', context.payload.data)
    } else {
      return initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('my.blog_post.uid', context.params.slug))
          .then(response => {
            return generatePageData('blog_post', response.results[0].data)
          })
      })
    }
  }
}
</script>