import React from 'react'
import ReactDOM from 'react-dom/client'
// import { MoralisProvider } from 'react-moralis'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <MoralisProvider initializeOnMount={true}> */}
    <App />
    {/* </MoralisProvider> */}
  </React.StrictMode>
)
