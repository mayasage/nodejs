# Webpack: Table Of Contents

- [Webpack: Table Of Contents](#webpack-table-of-contents)
  - [Installation](#installation)
  - [Alternative](#alternative)
    - [Create only 1 Config File](#create-only-1-config-file)
  - [Build-time code branching](#build-time-code-branching)
    - [Example: BTCB](#example-btcb)
  - [Module Swapping](#module-swapping)
    - [Example: MS](#example-ms)
  - [Add Babel](#add-babel)
  - [Appending React](#appending-react)

## Installation

1. `package.json`

    ```json
    {
      "type": "module"
    }
    ```

2. `npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin webpack-merge`

    ```json
    {
      "type": "module",
      "devDependencies": {
        "html-webpack-plugin": "5.5.3",
        "webpack": "5.88.2",
        "webpack-cli": "5.1.4",
        "webpack-dev-server": "4.15.1",
        "webpack-merge": "5.9.0"
      }
    }
    ```

3. Create Config files.

    [Alternative](#create-only-1-config-file)

    webpack.common.cjs

    ```js
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
      ],

      output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
      },

      optimization: {
        runtimeChunk: 'single',
      },
    }
    ```

    webpack.dev.cjs

    ```js
    const { merge } = require('webpack-merge')
    const common = require('./webpack.common.cjs')

    module.exports = merge(common, {
      mode: 'development',

      devtool: 'inline-source-map',

      devServer: {
        static: './dist',
      },
    })
    ```

    webpack.prod.cjs

    ```js
    const { merge } = require('webpack-merge')
    const common = require('./webpack.common.cjs')

    module.exports = merge(common, {
      mode: 'production',
    })
    ```

4. Install More Dependencies

    `npm i -D html-webpack-plugin webpack-merge`

5. Add scripts.

    ```json
    "scripts": {
      "start": "webpack serve --open --config webpack.dev.cjs",
      "build": "webpack --node-env=production --config webpack.prod.cjs"
    },
    ```

6. [Build-time code branching](#build-time-code-branching)

    1. Install plugin `npm i -D terser-webpack-plugin`

    2. Make changes to config file.

        webpack.common.cjs

        ```js
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

            new webpack.DefinePlugin({
              __BROWSER__: true,
            }),
          ],

          output: {
            filename: '[name].[contenthash].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
          },
        }
        ```

        webpack.prod.cjs

        ```js
        const TerserPlugin = require('terser-webpack-plugin')
        const { merge } = require('webpack-merge')
        const common = require('./webpack.common.cjs')

        module.exports = merge(common, {
          mode: 'production',

          optimization: {
            runtimeChunk: 'single',
            minimize: true,
            minimizer: [new TerserPlugin()],
          },
        })
        ```

        webpack.dev.cjs

        ```js
        const { merge } = require('webpack-merge')
        const common = require('./webpack.common.cjs')

        module.exports = merge(common, {
          mode: 'development',

          devtool: 'inline-source-map',

          devServer: {
            static: './dist',
          },
        })
        ```

## Alternative

### Create only 1 Config File

webpack.config.cjs

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: {
    index: './src/index.js',
  },

  devtool: 'inline-source-map',

  devServer: {
    static: './dist',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  optimization: {
    runtimeChunk: 'single',
  },
}
```

## Build-time code branching

**NOTE:**
Webpack v5 comes with `terser-webpack-plugin` out-of-the-box; but if you want to
customize, you need to install it manually.
Webpack v4 needs to install it manually.

If you use `if-else` to check environment at runtime, all the code will go to
the Client (even APIs & secrets).

To prevent this, what we can do is, instead of checking for environment at
runtime, we'll check it at build time.

   1. Define a generic variable `__BROWSER__`.
   2. Use it in `if-else`.

   3. Now, we can replace this variable with `true` at build-time using the
      built-in `DefinePlugin` of Webpack when sending code to **Browser**.

   4. But, the server side code will still go... What we need now is
      **dead-code elimination**, for which, we can use `terser-webpack-plugin`.

   5. Done

But this is still bad.
Because our code will contain too many `if-else`.
So, it's much better to move platform-specific code into its dedicated module.

### Example: BTCB

```js
export function sayHello(name) {
  if (typeof __BROWSER__ !== 'undefined') {
    // client-side code
    const template = '<h1>Hello <i>{{ name }}</i></h1>'
    return nunjucks.renderString(template, { name })
  }

  /*
    The following is dead code when __BROWSER__ is true, and will be removed
    by the terser-webpack-plugin
  */
  // Node.js code
  return `Hello \u001b[1m${name}\u001b[0m`
}
```

## Module Swapping

The main idea is that we want to have two separate implementations of our
`sayHello` functionality:

- one optimized for the server (`say-hello.js`),
- and one optimized for the browser (`say-hello-browser.js`).

We will then tell webpack to replace any import of `say-hello.js` with
`say-hello-browser.js`.

### Example: MS

1. Separate Modules

    say-hello.js

    ```js
    import chalk from 'chalk'

    export function sayHello(name) {
      return `Hello ${chalk.green(name)}`
    }
    ```

    say-hello-browser.js

    ```js
    import nunjucks from 'nunjucks'

    const template = '<h1>Hello <i>{{ name }}</i></h1>'

    export function sayHello(name) {
      return nunjucks.renderString(template, { name })
    }
    ```

2. Change config file.

    - webpack.common.cjs

      Replace `webpack.DefinePlugin` with

      ```js
      new webpack.NormalModuleReplacementPlugin(
        /src\/lib\/say-hello\.js$/,
        path.resolve(__dirname, 'src', 'lib', 'say-hello-browser.js'),
      ),
      ```

      This will replace all `import { sayHello } from './lib/say-hello.js'`
      with `import { sayHello } from './lib/say-hello-browser.js'`

## Add Babel

1. Install dependencies

   `npm install -D babel-loader @babel/core @babel/preset-env webpack @babel/preset-react`

2. Add Configuration

    ```js
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }], // MUST for JSX
              ],
            },
          },
        },
      ],
    },
    ```

## Appending React

1. Plugin to add a 'root' element to HTML (for development purpose only).

    `npm install html-webpack-root-plugin --save-dev`

    webpack.common.js

    ```js
    plugins: [
      new HtmlWebpackRootPlugin(),
    ],
    ```

2. Install react stuff.

    `npm i htm react react-dom react-router-dom`
