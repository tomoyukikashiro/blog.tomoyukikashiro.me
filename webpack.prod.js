const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  output: {
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: [
          'file-loader?publicPath=/material-theme/images/&name=[name].[hash].[ext]',
          {loader: 'image-webpack-loader', query: { mozjpeg: { quality: 90}}}
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new ManifestPlugin({
      fileName: 'chunk-manifest.json'
    })
  ],
  devtool: 'nosources-source-map'
});