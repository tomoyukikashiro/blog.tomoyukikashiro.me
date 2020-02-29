import React from 'react'
import renderer from 'react-test-renderer'
import { requestAnimationFrame } from '../../__tests__/utils'
import { BlogIndexHead } from './index'

describe('BlogIndexHeader', function () {
  const site = {
    title: 'test title',
    description: 'test description',
    url: 'https://example.com',
    type: 'website',
    lang: 'en',
    socialAccount: 'testAccount'
  }
  let headElement;
  beforeEach(() => {
    headElement =
      headElement || document.head || document.querySelector("head");

    // resets DOM after each run
    headElement.innerHTML = "";
  })
  it('BlogIndexHeader render correctly', function (done) {
    renderer.create(<BlogIndexHead site={ site }/>).toJSON()
    requestAnimationFrame(() => {
      const tree = renderer.create(headElement.innerHTML).toJSON()   
      expect(tree).toMatchSnapshot()
      done()
    })
  }) 
})
