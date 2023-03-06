import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
// import App from './app2'

const rootElement = document.getElementById('app')
const root = createRoot(rootElement!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
