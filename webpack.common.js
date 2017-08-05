const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const outPutPath = path.resolve(__dirname, './theme/dist/');


module.exports = {
  entry: {
    main: './theme/src/scripts/main.js',
    font: './theme/src/scripts/font.js',
    'amp-main': './theme/src/styles/amp-main.scss'
  },
  output: {
    path: outPutPath
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([outPutPath])
  ]
};