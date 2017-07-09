const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');


const IS_PROD = process.env.NODE_ENV === 'production';

const output = {
  path: path.resolve(__dirname, './theme/dist/'),
  filename: IS_PROD ? '[name].[chunkhash].css' : '[name].css'
};

const assetFilename = IS_PROD ? '[name].[hash].[ext]' : '[name].[ext]';

var plugins = [];
if(IS_PROD) {
  plugins.push(new ExtractTextPlugin('[name].[chunkhash].css'));
  plugins.push(new ManifestPlugin({
    fileName: 'chunk-manifest.json'
  }));
} else {
  plugins.push(new ExtractTextPlugin('[name].css'));
}

module.exports = {
  entry: {
    main: './theme/src/styles/main.scss',
    pygment: './theme/src/styles/pygment.css',
    'amp-main': './theme/src/styles/amp-main.scss'
  },
  output: output,
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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader?publicPath=/material-theme/images/&name=' + assetFilename
      }
    ]
  },
  plugins: plugins
};
