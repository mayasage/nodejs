const rejectPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('Rose')), 1000)
})

rejectPromise.then(undefined, err => console.log(err))
