import React from 'react';
import { useNavigate } from 'react-router-dom';

const BACKDROP = 'https://image.tmdb.org/t/p/original';

export default function Hero({ movie }) {
  const navigate = useNavigate();
  if (!movie) return null;

  const styles = {
    hero: { position: 'relative', height: '85vh', backgroundImage: `url(${BACKDROP}${movie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end' },
    overlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.4) 60%, transparent 100%)' },
    content: { position: 'relative', zIndex: 1, padding: '0 3rem 4rem', maxWidth: '600px' },
    badge: { background: '#e50914', color: '#fff', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px', display: 'inline-block' },
    title: { fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '12px' },
    overview: { color: '#ccc', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
    btns: { display: 'flex', gap: '12px' },
    playBtn: { background: '#e50914', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '6px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' },
    infoBtn: { background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '12px 28px', borderRadius: '6px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(4px)' },
    meta: { color: '#aaa', fontSize: '0.85rem', marginBottom: '10px', display: 'flex', gap: '16px' },
  };

  return (
    <div style={styles.hero}>
      <div style={styles.overlay} />
      <div style={styles.content}>
        <span style={styles.badge}>🔥 Trending Now</span>
        <h1 style={styles.title}>{movie.title}</h1>
        <div style={styles.meta}>
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          <span>{movie.release_date?.split('-')[0]}</span>
          {movie.genre_ids?.length > 0 && <span>Action • Drama</span>}
        </div>
        <p style={styles.overview}>{movie.overview}</p>
        <div style={styles.btns}>
          <button style={styles.playBtn} onClick={() => navigate(`/movie/${movie.id}`)}>▶ Watch Now</button>
          <button style={styles.infoBtn} onClick={() => navigate(`/movie/${movie.id}`)}>ℹ More Info</button>
        </div>
      </div>
    </div>
  );
}
