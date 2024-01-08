export const createObservable = (obj, obs) =>
  new Proxy(obj, {
    set(tar, prop, val) {
      if (val !== tar[prop]) {
        const prev = tar[prop]
        Reflect.set(tar, prop, val)
        obs({ property: prop, currentValue: val, previousValue: prev })
      }

      return true
    },
  })
