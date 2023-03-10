import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Context/AuthProvider';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
      <AuthProvider>
        <ToastContainer position='top-right' />
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

