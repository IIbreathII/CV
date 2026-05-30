import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Рендерит только <App />, без LoadingScreen — она client-only
export function render() {
  return renderToString(<App />)
}