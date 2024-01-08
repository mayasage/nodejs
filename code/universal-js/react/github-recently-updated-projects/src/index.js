import { createElement } from 'react'
import ReactDOM from 'react-dom'
import htm from 'htm'
import { App } from './App.js'

const html = htm.bind(createElement)
ReactDOM.render(html`<${App} />`, document.getElementsByTagName('body')[0])
