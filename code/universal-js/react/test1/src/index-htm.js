import { Component, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import htm from 'htm'

const html = htm.bind(createElement)
class Hello extends Component {
  render() {
    // Doesn't work
    // const txt = `
    //   <h1>
    //     Hello ${this.props.name || 'World'}
    //   </h1>`

    // return html`${txt}`

    return html`<h1>Hello ${this.props.name || 'World'}</h1>`
  }
}

const container = document.getElementsByTagName('body')[0]
const root = createRoot(container)
root.render(html`<${Hello} name="React" />`)
