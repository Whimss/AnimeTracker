import './index.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import SingleView from './pages/SingleView';
import MainNavigation from './components/MainNavigation'

function App() {
  return (
  <Router>
    <MainNavigation/>
    <main>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/single-view" element={<SingleView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </main>
  </Router>
  );
}

export default App;
