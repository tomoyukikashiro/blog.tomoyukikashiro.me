// From gatsby-plugin-glamor
const { renderToString } = require("react-dom/server")

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const bodyHTML = renderToString(bodyComponent)
  console.log(bodyHTML)
  console.log('-------------')
  replaceBodyHTMLString(bodyHTML)
}
