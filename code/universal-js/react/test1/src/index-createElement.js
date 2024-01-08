import { Component, createElement } from 'react'
import { render } from 'react-dom'

class Hello extends Component {
  render() {
    return createElement('h1', null, ['Hello ', this.props.name || 'World'])
  }
}

render(
  createElement(Hello, { name: 'React' }),
  document.getElementsByTagName('body')[0],
)
