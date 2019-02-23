import Site from './site'
import Post from './post'

describe('Site', function () {
  describe('.title', function () {
    const meta = {title: 'test title'}
    it('should be "test title"', function () {
      expect(new Site(meta).title).toEqual('test title')
    })
  })

  describe('.tagsPageTtitle', function () {
    const meta = {title: 'test title'}
    it('should be as expected', function () {
      expect(new Site(meta).tagsPageTitle).toEqual('TAGS | test title')
    })
  })

  describe('.tagsPagePrefix', function () {
    describe('When total count is 1', function () {
      it('should be as expected', function () {
        expect(new Site().tagPagePrefix('test', 1)).toEqual('Post tagged with "TEST"')
      })
    })
    describe('When total count is greater than 1', function () {
      it('should be as expected', function () {
        expect(new Site().tagPagePrefix('test', 2)).toEqual('Posts tagged with "TEST"')
      })
    })
  })

  describe('.tagPageTitle', function () {
    const meta = {title: 'test title'}
    it('should be as expected', function () {
      expect(new Site(meta).tagPageTitle('test', 1)).toEqual('Post tagged with "TEST" TAG | test title')
    })
  })

  describe('.description', function () {
    const meta = {description: 'test description'}
    it('should be as expected', function () {
      expect(new Site(meta).description).toEqual('test description')
    })
  })

  describe('.tagsPageDescription', function () {
    const meta = {description: 'test description'}
    it('should be as expected', function () {
      expect(new Site(meta).tagsPageDescription).toEqual('TAGS | test description')
    })
  })

  describe('.tagPageDescription', function () {
    const meta = {description: 'test description'}
    it('should be as expected', function () {
      expect(new Site(meta).tagPageDescription('test', 1)).toEqual('Post tagged with "TEST" TAG | test description')
    })
  })

  describe('.postPageDescription', function () {
    const meta = {description: 'test description'}
    it('should be as expected', function () {
      expect(new Site(meta).postPageDescription({summary: 'test summary'})).toEqual('test summary')
    })
  })

  describe('.url', function () {
    const meta = {siteUrl: 'https://example.com'}
    it('should be as expected', function () {
      expect(new Site(meta).url).toEqual('https://example.com')
    })
  })

  describe('.ampUrl', function () {
    const meta = {ampUrl: 'https://example.com'}
    it('should be as expected', function () {
      expect(new Site(meta).ampUrl).toEqual('https://example.com')
    })
  })

  describe('.postUrl', function () {
    const meta = {siteUrl: 'https://example.com'}
    const site = new Site(meta)
    const node = {frontmatter: {slug: 'test-slug', lang: 'ja'}}
    const post = new Post(node)
    it('should be as expected', function () {
      expect(site.postUrl(post)).toEqual('https://example.com/post/ja/test-slug/')
    })
  })

  describe('.postEnUrl', function () {
    const meta = {siteUrl: 'https://example.com'}
    const site = new Site(meta)
    const node = {frontmatter: {slug: 'test-slug', lang: 'ja'}}
    const post = new Post(node)
    it('should be as expected', function () {
      expect(site.postEnUrl(post)).toEqual('https://example.com/post/test-slug/')
    })
  })

  describe('.postAlternativeLangUrl', function () {
    const meta = {siteUrl: 'https://example.com'}
    const site = new Site(meta)
    const node = {frontmatter: {slug: 'test-slug', lang: 'ja'}}
    const post = new Post(node)
    it('should be as expected', function () {
      expect(site.postAlternativeLangUrl(post)).toEqual('https://example.com/post/test-slug/')
    })
  })

  describe('.canonicalPostAmpUrl', function () {
    const meta = {ampUrl: 'https://example.com'}
    const site = new Site(meta)
    const node = {frontmatter: {slug: 'test-slug', lang: 'ja'}}
    const post = new Post(node)
    it('should be as expected', function () {
      expect(site.canonicalPostAmpUrl(post)).toEqual('https://example.com/post/ja/test-slug/')
    })
  })

  describe('.tagsPageUrl', function () {
    const meta = {siteUrl: 'https://example.com'}
    it('should be as expected', function () {
      expect(new Site(meta).tagsPageUrl).toEqual('https://example.com/tags')
    }) 
  })
  
  describe('.tagPageUrl', function () {
    const meta = {siteUrl: 'https://example.com'}
    it('should be as expected', function () {
      expect(new Site(meta).tagPageUrl('test')).toEqual('https://example.com/tag/test/')
    }) 
  })

  describe('.profileUrl', function () {
    const meta = {profileUrl: 'https://example.com'}
    it('should be as expected', function () {
      expect(new Site(meta).profileUrl).toEqual('https://example.com')
    }) 
  })

  describe('.type', function () {
    it('should be website', function () {
      expect(new Site().type).toEqual('website')
    }) 
  })

  describe('.author', function () {
    const meta = {author: 'Tomoyuki Kashiro'}
    it('should be as expected', function () {
      expect(new Site(meta).author).toEqual('Tomoyuki Kashiro')
    }) 
  })

  describe('.twitterUserName', function () {
    const meta = {twitterUserName: 'tomoyukikashiro'}
    it('should be as expected', function () {
      expect(new Site(meta).twitterUserName).toEqual('tomoyukikashiro')
    })
  })
})
