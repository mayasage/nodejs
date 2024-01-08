import { html } from 'htm/react'
import { Link } from 'react-router-dom'

import Header from '../Header.js'
import authors from '../../../data/authors.js'

const AuthorsIndex = () => {
  // throw new Error('dire')
  return html`
    <div>
      <${Header} />
      <div>
        ${authors.map(
          a => html`
          <div key=${a.id}>
            <p>
              <${Link} to="${`/author/${a.id}`}"> ${a.name} </${Link}>
            </p>
          </div>
        `,
        )}
      </div>
    </div>
  `
}

export default AuthorsIndex
