import { worker } from 'workerpool'
const add = (a, b) => a + b
worker({ add })
