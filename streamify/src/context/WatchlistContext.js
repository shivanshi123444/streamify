import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  const key = user ? `streamify_watchlist_${user.id}` : null;

  useEffect(() => {
    if (key) {
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      setWatchlist(stored);
    } else {
      setWatchlist([]);
    }
  }, [key]);

  const addToWatchlist = (movie) => {
    if (!key) return;
    const updated = [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const removeFromWatchlist = (movieId) => {
    if (!key) return;
    const updated = watchlist.filter(m => m.id !== movieId);
    setWatchlist(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const isInWatchlist = (movieId) => watchlist.some(m => m.id === movieId);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
