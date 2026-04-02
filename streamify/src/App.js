import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WatchlistProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </WatchlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
