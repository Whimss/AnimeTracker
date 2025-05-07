import './index.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import SingleView from './pages/SingleView';
import MainNavigation from './components/MainNavigation';
import { SearchProvider } from './context/search';
import { AuthProvider } from './components/AuthProvider'; // Import
import SignInPage from './pages/SignInPage';
import ProtectedRoute from './components/ProtectedRoute';
import MyAnimeList from './pages/MyAnimeList';
import { AnimeActionsProvider } from './context/AnimeActions';
import { SnackbarProvider } from './context/SnackBar';

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <AnimeActionsProvider>
          <SearchProvider>
            <Router>
              <MainNavigation />
              <main>
                <Routes>
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
                  <Route path="/single-view" element={<ProtectedRoute><SingleView /></ProtectedRoute>} />
                  <Route path="/my-anime-list" element={<ProtectedRoute><MyAnimeList /></ProtectedRoute>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </Router>
          </SearchProvider>
        </AnimeActionsProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
