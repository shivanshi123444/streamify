import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovies';
import { useWatchlist } from '../context/WatchlistContext';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const IMG = process.env.REACT_APP_TMDB_IMAGE_URL;
const BACKDROP = 'https://image.tmdb.org/t/p/original';

export default function MovieDetail() {
  const { id } = useParams();
  const { movie, cast, similar, loading } = useMovieDetails(id);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', color: '#888' }}>Loading... 🎬</div>;
  if (!movie) return null;

  const inList = isInWatchlist(movie.id);

  const toggle = () => {
    if (!user) { navigate('/login'); return; }
    inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
  };

  const s = {
    backdrop: { position: 'relative', height: '60vh', backgroundImage: `url(${BACKDROP}${movie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center' },
    overlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.3) 100%)' },
    content: { padding: '0 2rem 3rem', maxWidth: '1100px', margin: '0 auto' },
    topRow: { display: 'flex', gap: '2rem', marginTop: '-180px', position: 'relative', zIndex: 1, alignItems: 'flex-end', flexWrap: 'wrap' },
    poster: { width: '200px', minWidth: '200px', height: '300px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 8px 32px rgba(0,0,0,0.8)' },
    info: { flex: 1, paddingBottom: '10px' },
    title: { fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' },
    tagline: { color: '#e50914', fontStyle: 'italic', marginBottom: '12px', fontSize: '0.95rem' },
    meta: { display: 'flex', gap: '16px', color: '#aaa', fontSize: '0.9rem', marginBottom: '16px', flexWrap: 'wrap' },
    genres: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' },
    genre: { background: '#1a1a1a', border: '1px solid #333', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' },
    overview: { color: '#ccc', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: '600px', marginBottom: '20px' },
    btns: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
    watchBtn: { background: inList ? '#333' : '#e50914', border: 'none', color: '#fff', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' },
    rating: { display: 'flex', alignItems: 'center', gap: '6px', background: '#1a1a1a', border: '1px solid #333', padding: '10px 16px', borderRadius: '8px', fontWeight: 700 },
    sectionTitle: { fontSize: '1.3rem', fontWeight: 700, margin: '2.5rem 0 1rem' },
    castRow: { display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' },
    castCard: { textAlign: 'center', flexShrink: 0, width: '90px' },
    castImg: { width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '6px' },
    castName: { fontSize: '0.75rem', color: '#ccc' },
    castChar: { fontSize: '0.7rem', color: '#888' },
    simGrid: { display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '10px' },
  };

  return (
    <div>
      <div style={s.backdrop}><div style={s.overlay} /></div>
      <div style={s.content}>
        <div style={s.topRow}>
          <img src={movie.poster_path ? `${IMG}${movie.poster_path}` : 'https://via.placeholder.com/200x300'} alt={movie.title} style={s.poster} />
          <div style={s.info}>
            <h1 style={s.title}>{movie.title}</h1>
            {movie.tagline && <p style={s.tagline}>"{movie.tagline}"</p>}
            <div style={s.meta}>
              <span>📅 {movie.release_date?.split('-')[0]}</span>
              <span>⏱ {movie.runtime} min</span>
              <span>🌍 {movie.original_language?.toUpperCase()}</span>
              <span>💰 {movie.revenue ? `$${(movie.revenue / 1e6).toFixed(0)}M` : 'N/A'}</span>
            </div>
            <div style={s.genres}>
              {movie.genres?.map(g => <span key={g.id} style={s.genre}>{g.name}</span>)}
            </div>
            <p style={s.overview}>{movie.overview}</p>
            <div style={s.btns}>
              <button style={s.watchBtn} onClick={toggle}>
                {inList ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>
              <div style={s.rating}>⭐ {movie.vote_average?.toFixed(1)} <span style={{ color: '#888', fontWeight: 400, fontSize: '0.85rem' }}>/ 10</span></div>
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <>
            <h2 style={s.sectionTitle}>🎭 Cast</h2>
            <div style={s.castRow}>
              {cast.map(c => (
                <div key={c.id} style={s.castCard}>
                  <img src={c.profile_path ? `${IMG}${c.profile_path}` : 'https://via.placeholder.com/80x80?text=?'} alt={c.name} style={s.castImg} />
                  <div style={s.castName}>{c.name}</div>
                  <div style={s.castChar}>{c.character}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Similar */}
        {similar.length > 0 && (
          <>
            <h2 style={s.sectionTitle}>🎬 Similar Movies</h2>
            <div style={s.simGrid}>
              {similar.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
