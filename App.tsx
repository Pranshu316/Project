import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './front'; // FrontPage component
import HomePage from './home'; // HomePage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/predict" element={<HomePage />} /> {/* This is where the prediction form will be rendered */}
      </Routes>
    </Router>
  );
}

export default App;
