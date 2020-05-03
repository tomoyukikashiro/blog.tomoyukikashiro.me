import Post from './post'

export default class Site {

  constructor(siteMetadata) {
    this.meta = siteMetadata
  }
  
  // --- title ---
  
  get title() {
    return this.meta.title
  }
  
  // --- description ---
  get description() {
    return this.meta.description
  }
  
  postPageDescription(post) {
    return post.summary
  }
  
  
  // --- url ---
  
  get url() {
    return this.meta.siteUrl
  }
  
  get ampUrl() {
    return this.meta.ampUrl
  }
  
  postUrl(post, lang) {
    return `${this.url}${post.path(lang)}`
  }
  
  postEnUrl(post) {
    return this.postUrl(post, Post.LANGS.EN)
  }
  
  postAlternativeLangUrl(post) {
    return this.postUrl(post, post.alternativeLang)
  }
  
  canonicalPostAmpUrl(post) {
    return `${this.ampUrl}${post.path()}`
  }

  get profileUrl() {
    return this.meta.profileUrl
  }
  
  // --- others ---

  get type() {
    return 'website'
  }

  get author() {
    return this.meta.author
  }
  
  get socialAccount() {
    return this.meta.socialAccount
  }
}
