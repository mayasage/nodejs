const jsonMiddleware = () => ({
  inbound: msg => JSON.parse(msg.toString()),
  outbound: msg => Buffer.from(JSON.stringify(msg.toString)),
})

export default jsonMiddleware
