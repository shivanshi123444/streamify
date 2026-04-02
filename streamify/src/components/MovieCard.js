import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { useAuth } from '../context/AuthContext';

const IMG = process.env.REACT_APP_TMDB_IMAGE_URL;

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inList = isInWatchlist(movie.id);

  const styles = {
    card: { position: 'relative', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s', background: '#1a1a1a', flexShrink: 0, width: '160px' },
    img: { width: '100%', height: '240px', objectFit: 'cover', display: 'block' },
    overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.95))', padding: '30px 10px 10px' },
    title: { fontSize: '0.8rem', fontWeight: 600, color: '#fff', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    meta: { fontSize: '0.72rem', color: '#aaa', display: 'flex', justifyContent: 'space-between' },
    wBtn: { position: 'absolute', top: '8px', right: '8px', background: inList ? '#e50914' : 'rgba(0,0,0,0.7)', border: '1px solid ' + (inList ? '#e50914' : '#555'), color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', cursor: 'pointer', zIndex: 10 },
  };

  const toggle = (e) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
  };

  return (
    <div style={styles.card} onClick={() => navigate(`/movie/${movie.id}`)}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      <img src={movie.poster_path ? `${IMG}${movie.poster_path}` : 'https://via.placeholder.com/160x240?text=No+Image'} alt={movie.title} style={styles.img} />
      <div style={styles.overlay}>
        <div style={styles.title}>{movie.title}</div>
        <div style={styles.meta}>
          <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
      <button style={styles.wBtn} onClick={toggle} title={inList ? 'Remove from watchlist' : 'Add to watchlist'}>
        {inList ? '✓' : '+'}
      </button>
    </div>
  );
}
