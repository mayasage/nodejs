const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
    }),

    new webpack.NormalModuleReplacementPlugin(
      /src\/lib\/say-hello\.js$/,
      path.resolve(__dirname, 'src', 'lib', 'say-hello-browser.js'),
    ),
  ],

  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
