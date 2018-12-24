import Post from './post'

describe('Post', function () {
  describe('#LANGS', function () {
    it('should have JA', function () {
      expect(Post.LANGS.JA).toEqual('ja')
    })
    it('should have EN', function () {
      expect(Post.LANGS.EN).toEqual('en-US')
    })
  })

  describe('.key', function () {
    const node = {frontmatter: {lang: 'ja', slug: 'test'}}
    it('should be "${lang}-${slug}"', function () {
      expect(new Post(node).key).toEqual('ja-test')
    })
  })

  describe('.title', function () {
    const node = {frontmatter: {title: 'test-title'}}
    it('should be "test-title"', function () {
      expect(new Post(node).title).toEqual('test-title')
    })
    describe('When title has space', function () {
      const node = {frontmatter: {title: '  test-title   '}}
      it('should be "test-title"', function () {
        expect(new Post(node).title).toEqual('test-title')
      })
    })
  })

  describe('.date', function () {
    const date = '2018-12-23'
    const node = {frontmatter: {date}}
    it('should return date object', function () {
      expect(new Post(node).date).toEqual(new Date(date))     
    })
  })
  
  describe('.isoDate', function () {
    const date = '2018-12-23'
    const node = {frontmatter: {date}}
    it('should return date object', function () {
      expect(new Post(node).isoDate).toEqual(new Date(date).toISOString())     
    })
  })

  describe('.formatDate', function () {
    const date = '2018-12-23'
    const node = {frontmatter: {date}}
    it('should return formatted date', function () {
      expect(new Post(node).formatDate).toEqual('Sunday December 23, 2018')
    })
  })

  describe('.type', function () {
    it('should be article', function () {
      expect(new Post().type).toEqual('article')
    }) 
  })

  describe('.summary', function () {
    const node = {frontmatter: {summary: 'test summary'}}
    it('should be "test summary"', function () {
      expect(new Post(node).summary).toEqual('test summary')
    })
    describe('When summary does not exist', function () {
      const node = {frontmatter: {}}
      it('should return empty string', function () {
        expect(new Post(node).summary).toEqual('')
      }) 
    })
    describe('When summary has space', function () {
      const node = {frontmatter: {summary: '      test summary    '}}
      it('should return it without space', function () {
        expect(new Post(node).summary).toEqual('test summary')
      }) 
    })
  })

  describe('.slug', function () {
    const node = {frontmatter: {slug: 'test-slug'}}
    it('should be "test-slug"', function () {
      expect(new Post(node).slug).toEqual('test-slug')
    })
    describe('When it has space', function () {
      const node = {frontmatter: {slug: ' test-slug    '}}
      it('should be "test-slug"', function () {
        expect(new Post(node).slug).toEqual('test-slug')
      })
    })
  })
  
  describe('.lang', function () {
    const node = {frontmatter: {lang: 'ja'}}
    it('should be "ja"', function () {
      expect(new Post(node).lang).toEqual('ja')
    })
    describe('When it has space', function () {
      const node = {frontmatter: {lang: '  ja   '}}
      it('should be "ja"', function () {
        expect(new Post(node).lang).toEqual('ja')
      })
    })
  })

  describe('.isEn', function () {
    describe('When lang is ja', function () {
      const node = {frontmatter: {lang: 'ja'}}
      it('should be false', function () {
        expect(new Post(node).isEn).toBe(false)
      })
    }) 
    describe('When lang is en-US', function () {
      const node = {frontmatter: {lang: 'en-US'}}
      it('should be true', function () {
        expect(new Post(node).isEn).toBe(true)
      })
    }) 
  })

  describe('.isJa', function () {
    describe('When lang is ja', function () {
      const node = {frontmatter: {lang: 'ja'}}
      it('should be true', function () {
        expect(new Post(node).isJa).toBe(true)
      })
    })
    describe('When lang is en-US', function () {
      const node = {frontmatter: {lang: 'en-US'}}
      it('should be false', function () {
        expect(new Post(node).isJa).toBe(false)
      })
    })
  })

  describe('.alternativeLang', function () {
    describe('When lang is ja', function () {
      const node = {frontmatter: {lang: 'ja'}}
      it('should be "en-US"', function () {
        expect(new Post(node).alternativeLang).toEqual('en-US')
      })
    })
    describe('When lang is en-US', function () {
      const node = {frontmatter: {lang: 'en-US'}}
      it('should be "ja"', function () {
        expect(new Post(node).alternativeLang).toEqual('ja')
      })
    }) 
  })

  describe('.tags', function () {
    describe('When tags does not exist', function () {
      const node = {frontmatter: {}}
      it('should be empy array', function () {
       expect(new Post(node).tags).toEqual([]) 
      }) 
    })
    describe('When tags contain upper case', function () {
      const node = {frontmatter: {tags: ['TEST', 'aaaa']}}
      it('should be lower case', function () {
       expect(new Post(node).tags).toContain('test')
       expect(new Post(node).tags).toContain('aaaa')
      }) 
    })
  })

  describe('.hasTags', function () {
    describe('When tags does not exist', function () {
      const node = {frontmatter: {}}
      it('should be false', function () {
        expect(new Post(node).hasTags).toBe(false) 
      })
    }) 
    describe('When tags exists', function () {
      const node = {frontmatter: {tags: ['test']}}
      it('should be true', function () {
        expect(new Post(node).hasTags).toBe(true) 
      })
    }) 
  })

  describe('.path', function () {
    describe('When lang of node is ja', function () {
      const node = {frontmatter: {lang: 'ja', slug: 'test-slug'}}
      it('should use node path', function () {
        expect(new Post(node).path()).toEqual('/post/ja/test-slug') 
      }) 
    }) 
    describe('When lang of node is en-US', function () {
      const node = {frontmatter: {lang: 'en-US', slug: 'test-slug'}}
      it('should use node path', function () {
        expect(new Post(node).path()).toEqual('/post/test-slug') 
      }) 
    })
    describe('When lang is passed', function () {
      const node = {frontmatter: {lang: 'en-US', slug: 'test-slug'}}
      it('should return path using that lang', function () {
        expect(new Post(node).path('ja')).toEqual('/post/ja/test-slug') 
      }) 
    })
  })

  describe('.alternativeLangPath', function () {
    describe('When lang is ja', function () {
      const node = {frontmatter: {lang: 'ja', slug: 'test-slug'}}
      it('should return en-US path', function () {
       expect(new Post(node).alternativeLangPath).toEqual('/post/test-slug') 
      }) 
    }) 
    describe('When lang is en-US', function () {
      const node = {frontmatter: {lang: 'en-US', slug: 'test-slug'}}
      it('should return ja path', function () {
       expect(new Post(node).alternativeLangPath).toEqual('/post/ja/test-slug') 
      }) 
    }) 
  })

  describe('.html', function () {
    const node = {html: 'html string'}
    it('should retrun html', function () {
     expect(new Post(node).html).toEqual('html string') 
    }) 
  })
})
