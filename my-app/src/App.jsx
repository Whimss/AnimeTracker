import './index.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import SingleView from './pages/SingleView';
import MainNavigation from './components/MainNavigation';
import { SearchContext } from './context/search';
import { AuthProvider } from './components/AuthProvider'; // Import
import SignInPage from './pages/SignInPage';
import ProtectedRoute from './components/ProtectedRoute';
import MyAnimeList from './pages/MyAnimeList';
import { AnimeActionsProvider } from './context/AnimeActions';
import { SnackbarProvider } from './context/SnackBar';

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



  return (
    <SnackbarProvider>
      <AuthProvider>
        <AnimeActionsProvider>
          <SearchContext.Provider value={{ search, animeData, setData, singleData, setSingle }}>
            <Router>
              <MainNavigation />
              <main>
                <Routes>
                  <Route path="/signin" element={<SignInPage />} />

                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/results"
                    element={
                      <ProtectedRoute>
                        <Results />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/single-view"
                    element={
                      <ProtectedRoute>
                        <SingleView />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-anime-list"
                    element={
                      <ProtectedRoute>
                        <MyAnimeList />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </Router>
          </SearchContext.Provider>
        </AnimeActionsProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
