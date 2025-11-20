// src/App.js
import React from 'react';
import ReviewList from './components/ReviewList'; // Imports the list component

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: '#075E54', padding: '20px' }}>
        WhatsApp Review Dashboard
      </h1>
      <ReviewList />
    </div>
  );
}

export default App;