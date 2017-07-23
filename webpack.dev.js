const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader?publicPath=/material-theme/images/&name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  devtool: 'cheap-module-eval-source-map'
});
