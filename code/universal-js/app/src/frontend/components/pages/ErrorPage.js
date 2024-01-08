import { html } from 'htm/react'
import { Link } from 'react-router-dom'

import Header from '../Header.js'

const Error = props => {
  return html`
    <div>
      <${Header} />
      <div>
        <h2>404</h2>
        <h3>${(props && props.error) || 'Page not found'}</h3>
        <${Link} to="/">Go back to the home page</${Link}>
      </div>
    </div>
  `
}

export default Error
