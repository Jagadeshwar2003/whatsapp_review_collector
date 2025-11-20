// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Imports the main component

// Renders the App component into the element with id="root" in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);