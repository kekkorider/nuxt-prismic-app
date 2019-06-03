import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'

const config = {
  baseUrl: process.env.PRISMIC_API_URL,
  access_token: process.env.PRIMIC_API_KEY
}

export const initApi = req => {
  return Prismic.getApi(config.baseUrl, {
    accessToken: config.access_token,
    req: req
  })
}

export const queryForDocType = async (docType) => {
  const data = await initApi()
  const queried = await data.query(Prismic.Predicates.at('document.type', docType))
  return queried
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
    case 'blog_page':
      return {
        posts: data
      }
    case 'blog_post':
      return {
        title: PrismicDOM.RichText.asText(data.title),
        content: PrismicDOM.RichText.asText(data.content)
      }
  }
}
