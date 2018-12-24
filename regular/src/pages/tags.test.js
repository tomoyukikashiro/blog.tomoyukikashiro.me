import React from 'react'
import renderer from 'react-test-renderer'
import { requestAnimationFrame } from '../../__tests__/utils'
import { TagsPageHead } from './tags'

describe('TagsPageHead', function () {
  const site = {
    tagsPageTitle: 'test title',
    tagsPageDescription: 'test description',
    tagsPageUrl: 'https://example.com/tags',
    url: 'https://example.com',
    type: 'website',
    twitterUserName: 'testAccount' 
  }
  let headElement;
  beforeEach(() => {
    headElement =
      headElement || document.head || document.querySelector("head");

    // resets DOM after each run
    headElement.innerHTML = "";
  })
  it('TagsPageHead render correctly', function (done) {
    renderer.create(<TagsPageHead site={ site }/>).toJSON()
    requestAnimationFrame(() => {
      const tree = renderer.create(headElement.innerHTML).toJSON()   
      expect(tree).toMatchSnapshot()
      done()
    })
  }) 
})
