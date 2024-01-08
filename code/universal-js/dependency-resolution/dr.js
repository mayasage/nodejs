import moduleMap from './moduleMap.js'

const res = (modulesMap => {
  const require = name => {
    const module = { exports: {} }
    modulesMap[name](module, require)
    return module.exports
  }
  return require('app.js')
})(moduleMap)

console.log(res)
