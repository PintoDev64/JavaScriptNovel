import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'
import LenguageProvider from './context/Lenguage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <LenguageProvider>
      <App />
    </LenguageProvider>
  </StrictMode>
)