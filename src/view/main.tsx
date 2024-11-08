import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Styles
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
        <App />
  </StrictMode>
)