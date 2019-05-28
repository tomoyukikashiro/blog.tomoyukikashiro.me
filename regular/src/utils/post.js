// import moment from 'moment'

export default class Post {

  static LANGS = {
    JA: 'ja',
    EN: 'en'
  }

  constructor(node) {
    this.node = node
  }
  
  get key() {
    const key = `${this.lang}-${this.slug}`
    return key || Date.now()
  }

  get title() {
    return this.node.frontmatter.title ? this.node.frontmatter.title.trim() : ''
  }

  get date() {
    if (!this.node.frontmatter.date) return
    return new Date(this.node.frontmatter.date.trim())
  }
  
  get type() {
    return 'article'
  }
  
  get isoDate() {
    return this.date.toISOString()
  }
  
  get formatDate() {
    return this.date.toLocaleString('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    // return moment(this.date.toISOString()).format('dddd LL')
  }
  
  get summary() {
    return this.node.frontmatter.summary ? this.node.frontmatter.summary.trim() : ''
  }
  
  get slug() {
    return this.node.frontmatter.slug ? this.node.frontmatter.slug.trim() : ''
  }
  
  get lang() {
    return this.node.frontmatter.lang ? this.node.frontmatter.lang.trim() : ''
  }
  
  get isEn() {
    return this.lang === Post.LANGS.EN
  }
  
  get isJa() {
    return this.lang === Post.LANGS.JA
  }
  
  get alternativeLang() {
    return this.isEn ? Post.LANGS.JA : Post.LANGS.EN
  }
  
  get tags() {
    if (this.node.frontmatter.tags) {
      return this.node.frontmatter.tags.map(tag => tag.trim().toLowerCase()) 
    } else {
      return []
    }
  }
  
  get hasTags() {
    return !!this.tags.length
  }

  path(lang) {
    const langPath = (lang || this.lang) === Post.LANGS.JA ? '/ja/' : '/'
    return `/post${langPath}${this.slug}`
  }
  
  get alternativeLangPath() {
    return this.path(this.alternativeLang)
  }
  
  get html() {
    return this.node.html
  }
}
  

