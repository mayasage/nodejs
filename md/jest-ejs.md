# Jest EJS

Import won't work by default.

Follow these steps:

1. Install Jest

    ```bash
    npm i --save-dev jest
    ```

2. Add the test script to your `package.json` file.

   ```json
   "scripts": {
    "test": "jest"
    },
   ```

3. Install Babel Plugin

    ```bash
    npm install --save-dev @babel/plugin-transform-modules-commonjs
    ```

4. Create a `.babelrc` file in the root directory.

    ```json
    {
      "env": {
        "test": {
          "plugins": ["@babel/plugin-transform-modules-commonjs"]
        }
      }
    }
    ```

5. Run `npm test` to start.
