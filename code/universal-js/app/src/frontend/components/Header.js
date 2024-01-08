import { createElement } from 'react'
import htm from 'htm'
import { Link } from 'react-router-dom'

const html = htm.bind(createElement)

const Header = () => {
  return html`
  <header>
    <h1>
      <${Link} to="/">My Library</${Link}>
    </h1>
  </header>
`
}

export default Header
