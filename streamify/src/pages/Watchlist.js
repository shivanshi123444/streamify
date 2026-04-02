import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

export default function Watchlist() {
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();

  const s = {
    page: { padding: '2rem', minHeight: '100vh' },
    h1: { fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' },
    count: { color: '#888', marginBottom: '2rem', fontSize: '0.95rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '18px' },
    empty: { textAlign: 'center', marginTop: '5rem' },
    emptyIcon: { fontSize: '4rem', marginBottom: '1rem' },
    emptyText: { color: '#888', fontSize: '1rem', marginBottom: '1.5rem' },
    browseBtn: { background: '#e50914', border: 'none', color: '#fff', padding: '12px 28px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' },
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>My Watchlist</h1>
      <p style={s.count}>{watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} saved</p>

      {watchlist.length === 0 ? (
        <div style={s.empty}>
          <div style={s.emptyIcon}>🎬</div>
          <p style={s.emptyText}>Your watchlist is empty. Start adding movies!</p>
          <button style={s.browseBtn} onClick={() => navigate('/movies')}>Browse Movies</button>
        </div>
      ) : (
        <div style={s.grid}>
          {watchlist.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </div>
  );
}
