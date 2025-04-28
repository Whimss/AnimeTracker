import './index.scss';
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import SingleView from './pages/SingleView';
import MainNavigation from './components/MainNavigation';
import { SearchContext } from './context/search';

function App() {

  const [animeData, setAnimeData] = useState([])
  const [singleData, setSingleData] = useState([])

  const setData = (data) => {
    setAnimeData(data)
  };

  const setSingle = (data) => {
    setSingleData(data)
  };

  const search = (searchTerm) => {
    return fetch(
      `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=20`
    ).then((response) => response.json());
  }

  useEffect(() => {
    // If you're not already on the home page, go to '/'
    if (window.location.pathname !== '/') {
      window.location.pathname = '/';
    }
  }, []); 

  return (
    <SearchContext.Provider value={{ search, animeData, setData, singleData, setSingle }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/single-view" element={<SingleView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </SearchContext.Provider>
  );
}

export default App;
