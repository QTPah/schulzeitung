import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { APIProvider } from './contexts/APIContext';

import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <APIProvider>
        <App />
      </APIProvider>
    </AuthProvider>
  </React.StrictMode>
);