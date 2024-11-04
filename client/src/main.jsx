import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './context/context.jsx'
import { SockerContextProvider } from './context/socket.jsx'
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apis/apollo.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
    <ContextProvider>
    <SockerContextProvider>
    <App />
    </SockerContextProvider>
    </ContextProvider>
    </ApolloProvider>
  </StrictMode>,
)