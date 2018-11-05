import React from "react"
import PropTypes from "prop-types"

export default class HTML extends React.Component {
  render() {
    const analyticsConfig = { "vars": { "account": "UA-50867411-3"}, "triggers": {"trackPageview": {"on": "visible", "request": "pageview"}}}
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="google-site-verification" content="F0csCPag4kfg-qefukr_0b2yJxXNbTtaJ11Cv7pVUcU" />
          {this.props.headComponents}
          <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
          <amp-analytics type="googleanalytics">
            <script
              type="application/json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(analyticsConfig)
              }} />
          </amp-analytics>
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {/*{this.props.postBodyComponents}*/}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
