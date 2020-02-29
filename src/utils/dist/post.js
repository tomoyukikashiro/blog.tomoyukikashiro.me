"use strict";

exports.__esModule = true;
exports.default = void 0;

// import moment from 'moment'
class Post {
  constructor(node) {
    this.node = node;
  }

  get key() {
    const key = `${this.lang}-${this.slug}`;
    return key || Date.now();
  }

  get title() {
    return this.node.frontmatter.title ? this.node.frontmatter.title.trim() : '';
  }

  get date() {
    if (!this.node.frontmatter.date) return;
    return new Date(this.node.frontmatter.date.trim());
  }

  get type() {
    return 'article';
  }

  get image() {
    const siteUrl = `https://blog.tomoyukikashiro.me`;
    const image = this.node.frontmatter.image && this.node.frontmatter.image.trim();
    return image || `${siteUrl}/images/${this.date.getDate() % 7}.jpg`;
  }

  get isoDate() {
    if (!this.date) return;
    return this.date.toISOString();
  }

  get formatDate() {
    if (!this.date) return;
    return this.date.toLocaleString('en', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }); // return moment(this.date.toISOString()).format('dddd LL')
  }

  get summary() {
    return this.node.frontmatter.summary ? this.node.frontmatter.summary.trim() : '';
  }

  get slug() {
    return this.node.frontmatter.slug ? this.node.frontmatter.slug.trim() : '';
  }

  get lang() {
    return this.node.frontmatter.lang ? this.node.frontmatter.lang.trim() : '';
  }

  get isEn() {
    return this.lang === Post.LANGS.EN;
  }

  get isJa() {
    return this.lang === Post.LANGS.JA;
  }

  get alternativeLang() {
    return this.isEn ? Post.LANGS.JA : Post.LANGS.EN;
  }

  path(lang) {
    const langPath = (lang || this.lang) === Post.LANGS.JA ? '/ja/' : '/';
    return `/post${langPath}${this.slug}`;
  }

  get alternativeLangPath() {
    return this.path(this.alternativeLang);
  }

  get html() {
    return this.node.html;
  }

  get tags() {
    return this.node.frontmatter.tags || [];
  }

}

exports.default = Post;
Post.LANGS = {
  JA: 'ja',
  EN: 'en'
};
