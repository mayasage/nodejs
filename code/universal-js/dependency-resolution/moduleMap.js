const moduleMap = {
  'app.js': (module, require) => {
    const { calculator } = require('calculator.js')
    const { display } = require('display.js')

    display(calculator('2 + 2 / 4'))
  },

  'calculator.js': (module, require) => {
    const { parser } = require('parser.js')
    const { resolver } = require('resolver.js')

    module.exports.calculator = function (expr) {
      return resolver(parser(expr))
    }
  },

  'display.js': (module, require) => {
    module.exports.display = function () {
      /* ... */
    }
  },

  'parser.js': (module, require) => {
    module.exports.parser = function () {
      /* ... */
    }
  },

  'resolver.js': (module, require) => {
    module.exports.resolver = function () {
      /* ... */
    }
  },
}

export default moduleMap
