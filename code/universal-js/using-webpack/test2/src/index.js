import { sayHello } from './lib/say-hello.js'

const body = document.getElementsByTagName('body')[0]

body.innerHTML = sayHello('Browser')
