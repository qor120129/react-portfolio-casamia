import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/main.css'
import { BrowserRouter } from 'react-router-dom'
import ScrollTop from './components/scrollTop'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
      <App />
  </>
  // </React.StrictMode >
)
