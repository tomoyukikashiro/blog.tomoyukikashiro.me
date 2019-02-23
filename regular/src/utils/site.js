import Post from './post'

export default class Site {

  constructor(siteMetadata) {
    this.meta = siteMetadata
  }
  
  // --- title ---
  
  get title() {
    return this.meta.title
  }
  
  get tagsPageTitle() {
    return `TAGS | ${this.title}`
  }
  
  tagPagePrefix(tag, totalCount) {
    return `Post${totalCount === 1 ? "" : "s"} tagged with "${tag.toUpperCase()}"`
  }
  
  tagPageTitle(tag, totalCount) {
    return `${this.tagPagePrefix(tag, totalCount)} TAG | ${this.title}`
  }

  // --- description ---
  get description() {
    return this.meta.description
  }
  
  get tagsPageDescription() {
    return `TAGS | ${this.meta.description}`
  }

  tagPageDescription(tag, totalCount) {
    return `${this.tagPagePrefix(tag, totalCount)} TAG | ${this.description}`
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
  
  canonicalPostUrl(post, lang) {
    if (post.canonicalUrl) return post.canonicalUrl
    return `${this.url}${post.path(lang)}/`
  }
 
  canonicalPostEnUrl(post) {
    return this.canonicalPostUrl(post, Post.LANGS.EN)
  }
  
  canonicalPostAlternativeLangUrl(post) {
    return this.canonicalPostUrl(post, post.alternativeLang)
  }
  
  canonicalPostAmpUrl(post) {
    return `${this.ampUrl}${post.path()}/`
  }

  get tagsPageUrl() {
    return `${this.url}/tags`
  }
  
  tagPageUrl(tag) {
    return `${this.url}/tag/${tag.toLowerCase()}/`
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
  
  get twitterUserName() {
    return this.meta.twitterUserName
  }
}
