import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingProvider from './Context/loading';
import App from './App';
import AuthProvider from './Context/auth';
import './main.css'
import IsClientProvider from './Context/isClient';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <IsClientProvider>
          <App></App>
        </IsClientProvider>
      </AuthProvider>
    </LoadingProvider>
  </React.StrictMode>
)
