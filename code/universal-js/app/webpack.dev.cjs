const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackRootPlugin = require('html-webpack-root-plugin')

module.exports = merge(common, {
  /*
  Sets process.env.NODE_ENV on DefinePlugin to value development.
  Enables useful names for modules and chunks.
  */
  mode: 'development',

  /*
  Recommended choice for development builds with high quality SourceMaps.
  */
  devtool: 'eval-source-map',
  devServer: {
    /*
    Renders 'index.html' as fallback when trying to go to the previous or the
    next page.
    */
    historyApiFallback: true,
    open: true, // open when browser when server starts
    static: './dist', // serve static files from here
  },

  plugins: [
    // Go live.
    new HtmlWebpackPlugin({
      title: 'My library',
      template: 'src/frontend/index.html'
    }),

    // new HtmlWebpackRootPlugin(), // Create a 'root' element for React.
  ],
})
