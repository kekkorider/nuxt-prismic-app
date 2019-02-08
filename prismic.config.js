import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'

const config = {
  baseUrl: 'https://nuxt-prismic-app.cdn.prismic.io/api/v2',
  access_token:
    'MC5YRjFwcmhFQUFDSUFvQVJf.77-977-9M2rvv73vv71_f--_vQ7vv73vv73vv70aZWzvv70SRu-_vREl77-977-9fzzvv71y77-977-977-9Gw'
}

export const initApi = req => {
  return Prismic.getApi(config.baseUrl, {
    accessToken: config.access_token,
    req: req
  })
}

export const linkResolver = doc => {
  if (doc.type === 'blog_post') return `/blog/${doc.uid}`
  return `/${doc.uid}`
}

export const generatePageData = (documentType, data) => {
  switch (documentType) {
    case 'homepage':
      return {
        title: PrismicDOM.RichText.asText(data.title),
        content: PrismicDOM.RichText.asText(data.content)
      }
    case 'about_page':
      return {
        title: PrismicDOM.RichText.asText(data.title),
        content: PrismicDOM.RichText.asText(data.content)
      }
    case 'blog_post':
      return {
        title: PrismicDOM.RichText.asText(data.title),
        content: PrismicDOM.RichText.asText(data.content)
      }
  }
}
