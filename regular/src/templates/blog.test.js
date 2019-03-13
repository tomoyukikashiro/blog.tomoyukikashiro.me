import React from 'react'
import renderer from 'react-test-renderer'
import { requestAnimationFrame } from '../../__tests__/utils'
import { BlogPostHead } from './blog'

describe('BlogPostHead', function () {
  const site = {
    postPageDescription: () => ('post description'),
    canonicalPostAmpUrl: () => ('https://amp.example.com'),
    postUrl: () => ('https://example.com'),
    canonicalPostUrl: () => ('https://canonical.example.com'),
    title: 'test site title',
    url: 'https://example.com',
    author: 'test author',
    twitterUserName: 'testAccount',
  }
  const post = {
    title: 'test post title',
    summary: 'test post summary',
    type: 'article',
    date: new Date('2018-12-24'),
    isoDate: new Date('2018-12-24').toISOString(),
    lang: 'en',
    tags: ['test1', 'test2'],
    path: () => ('/post/test-slug')
  }
  let headElement;
  beforeEach(() => {
    headElement = headElement || document.head || document.querySelector("head");

    // resets DOM after each run
    headElement.innerHTML = "";
  })
  describe('When hasAlternate is false', function () {
    it('BlogPostHead render correctly', function (done) {
      renderer.create(<BlogPostHead site={ site } post={post} hasAlternate={false}/>).toJSON()
      requestAnimationFrame(() => {
        const tree = renderer.create(headElement.innerHTML).toJSON()
        expect(tree).toMatchSnapshot()
        done()
      })
    })
  })
  describe('When hasAlternate is true', function () {
    site.postAlternativeLangUrl = () => ('https://example.com/post/ja/test-slug/')
    post.alternativeLang = 'ja'
    it('BlogPostHead render correctly', function (done) {
      renderer.create(<BlogPostHead site={ site } post={post} hasAlternate={true}/>).toJSON()
      requestAnimationFrame(() => {
        const tree = renderer.create(headElement.innerHTML).toJSON()
        expect(tree).toMatchSnapshot()
        done()
      })
    })
  })
})
