const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')
const webpack = require('webpack')

module.exports = merge(common, {
  /*
  At least sets process.env.NODE_ENV on DefinePlugin to value production.
  */
  mode: 'production',

  /*
  Recommended choice for production builds with high quality SourceMaps.
  */
  devtool: 'source-map',

  optimization: {
    runtimeChunk: 'single', // the runtime is shared for all generated chunks
    minimize: true, // minimize the bundle
    minimizer: [new TerserPlugin()], // dead-code elimination
  },

  plugins: [
    /*
    Use with 'if-else'.
    Webpack will replace the variable with 'true' at build time.
    This renders your 'else' block unreachable.
    Then 'terserPlugin' will perform dead-code elimination.
    Now, only the browser related code will be bundled.
    */
    new webpack.DefinePlugin({
      __BROWSER__: true,
    }),
  ],
})
