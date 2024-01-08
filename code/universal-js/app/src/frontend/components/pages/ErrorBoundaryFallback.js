import { html } from 'htm/react'
import { useRouteError } from 'react-router-dom'

const ErrorBoundaryFallback = () => {
  const error = useRouteError()
  console.log('error:', error)
  return html`<div>Something went wrong</div>`
}

export default ErrorBoundaryFallback
