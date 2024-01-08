import { html } from 'htm/react'
import { useParams } from 'react-router-dom'
import memoize from 'memoize-one'

import ErrorPage from './ErrorPage.js'
import Header from '../Header.js'

import authors from '../../../data/authors.js'

const findAuthorById = memoize(id => authors.find(a => a.id === id))

const Author = () => {
  const params = useParams()

  const author = findAuthorById(params.id)

  if (!author) {
    return html`<${ErrorPage} error="Author not found" />`
  }

  return html`
    <div>
      <${Header} />
      <h2>${author.name}</h2>
      <p>${author.bio}</p>
      <h3>Books</h3>
      <ul>
        ${author.books.map(
          book => html`<li key=${book.id}>${book.title} (${book.year})</li>`,
        )}
      </ul>
    </div>
  `
}

export default Author
