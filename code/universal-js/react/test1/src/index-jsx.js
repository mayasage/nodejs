import { Component } from 'react'
import { createRoot } from 'react-dom/client'

class Hello extends Component {
  render() {
    return <h1>Hello {this.props.name || 'World'}</h1>
  }
}

const container = document.getElementsByTagName('body')[0]
const root = createRoot(container)
root.render(<Hello name="React" />)
