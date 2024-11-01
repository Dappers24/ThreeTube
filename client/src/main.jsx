import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootApp from './App.jsx'
import { ContextProvider } from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <RootApp />
    </ContextProvider>
  </StrictMode>,
)