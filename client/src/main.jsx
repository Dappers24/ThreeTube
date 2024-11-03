import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './context/context.jsx'
import { SockerContextProvider } from './context/socket.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <SockerContextProvider>
    <App />
    </SockerContextProvider>
    </ContextProvider>
  </StrictMode>,
)