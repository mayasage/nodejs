const { resolve } = require('path')

module.exports = {
  entry: './src/frontend/client.js',

  output: {
    filename: '[name].[contenthash].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/', // base path for serving assets
    clean: true, // clean directory before bundling
  },

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile JS using Babel and webpack.
          options: {
            /*
            { targets: default }
              => some default browsers written in browserslist package

            Omitting => you wanna support the oldest of browsers
            */
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
            /*
            async-await & others
            */
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
}
