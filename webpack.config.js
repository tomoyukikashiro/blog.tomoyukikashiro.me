const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "theme/src/styles/main.scss"),
    'amp-main': path.join(__dirname, "theme/src/styles/amp-main.scss")
  },
  output: {
    path: path.join(__dirname, 'theme/src/styles/'),
    filename: '[name].css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new CopyWebpackPlugin([
      {from: 'theme/src/styles/main.css', to: '../../material/static/styles/main.css'},
      {from: 'theme/src/styles/amp-main.css', to: '../../amp/static/styles/amp-main.css'}
    ])
  ]
};
