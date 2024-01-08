Promise.all([Promise.resolve(10), Promise.resolve(30)]).then(res =>
  console.log(res),
)
