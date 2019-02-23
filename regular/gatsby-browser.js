/**
 * global css
 */
require('reset-css/reset.css')
require('github-markdown-css/github-markdown.css')
require('prismjs/themes/prism-tomorrow.css')
require('./src/assets/styles/variable.css')
require('./src/assets/styles/base.css')
require('./src/assets/styles/util.css')
require('./src/assets/styles/markdown.css')
require('./src/assets/styles/header.css')

/**
 * tag manager
 */
exports.onRouteUpdate = function() {
  // wrap inside a timeout to make sure react-helmet is done with it's changes (https://github.com/gatsbyjs/gatsby/issues/9139)
  // reactHelmet is using requestAnimationFrame so we should use it too: https://github.com/nfl/react-helmet/blob/5.2.0/src/HelmetUtils.js#L296-L299
  const sendPageView = () => {
    if (!window) return
    if (!window.dataLayer) { window.dataLayer = [] }
    window.dataLayer.push({event: 'pageview'})
  }

  if (`requestAnimationFrame` in window) {
    requestAnimationFrame(() => {
      requestAnimationFrame(sendPageView)
    })
  }
}


