import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SynopsisForm from './components/SynopsisForm';
import ProtocolForm from './components/ProtocolForm';
import ReviewPage from './components/ReviewPage';
import ProtocolAlpha from './components/ProtocolAlpha';
import HomePage from './components/HomePage';
import SynopsisPage from './components/SynopsisPage';
import DocumentOutline from './components/DocumentOutline';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/synopsis-page" element={<SynopsisPage />} />
          <Route path="/protocol-alpha" element={<ProtocolAlpha />} />
          <Route path="/synopsis-form" element={<SynopsisForm/>} /> {/* Route for the form */}
          <Route path="/protocol-form" element={<ProtocolForm/>} /> {/* Route for the form */}
          <Route path="/outline-page" element={<DocumentOutline/>} /> {/* Route for the form */}
          <Route path="/review-page" element={<ReviewPage />} /> {/* Route for the Review Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;