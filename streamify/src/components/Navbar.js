import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import { useSearch } from '../hooks/useMovies';

const IMG = process.env.REACT_APP_TMDB_IMAGE_URL;

export default function Navbar() {
  const { user, logout } = useAuth();
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { results } = useSearch(query);

  const styles = {
    nav: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(15,15,15,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #222', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' },
    logo: { fontSize: '1.6rem', fontWeight: 800, color: '#e50914', letterSpacing: '-1px', cursor: 'pointer' },
    links: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
    link: { color: '#ccc', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' },
    right: { display: 'flex', gap: '1rem', alignItems: 'center' },
    searchWrap: { position: 'relative' },
    searchInput: { background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', width: '220px', outline: 'none' },
    dropdown: { position: 'absolute', top: '110%', left: 0, width: '320px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', overflow: 'hidden', zIndex: 200 },
    dropItem: { display: 'flex', gap: '10px', padding: '10px', cursor: 'pointer', borderBottom: '1px solid #222', alignItems: 'center' },
    avatar: { width: '34px', height: '34px', borderRadius: '50%', background: '#e50914', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' },
    badge: { background: '#e50914', color: '#fff', borderRadius: '50%', fontSize: '10px', padding: '1px 5px', marginLeft: '-6px', marginTop: '-10px' },
    logoutBtn: { background: '#e50914', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => navigate('/')}>STREAMIFY</div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/movies" style={styles.link}>Movies</Link>
        {user && <Link to="/watchlist" style={styles.link}>Watchlist {watchlist.length > 0 && <span style={styles.badge}>{watchlist.length}</span>}</Link>}
      </div>

      <div style={styles.right}>
        {/* Search */}
        <div style={styles.searchWrap}>
          {showSearch
            ? <input autoFocus style={styles.searchInput} placeholder="Search movies..." value={query} onChange={e => setQuery(e.target.value)} onBlur={() => { setTimeout(() => { setShowSearch(false); setQuery(''); }, 200); }} />
            : <span style={{ cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => setShowSearch(true)}>🔍</span>
          }
          {results.length > 0 && query && (
            <div style={styles.dropdown}>
              {results.slice(0, 6).map(m => (
                <div key={m.id} style={styles.dropItem} onClick={() => { navigate(`/movie/${m.id}`); setQuery(''); setShowSearch(false); }}>
                  <img src={m.poster_path ? `${IMG}${m.poster_path}` : 'https://via.placeholder.com/40x55'} alt={m.title} style={{ width: 40, height: 55, borderRadius: 4, objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{m.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>{m.release_date?.split('-')[0]} • ⭐ {m.vote_average?.toFixed(1)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {user ? (
          <>
            <div style={styles.avatar}>{user.name[0].toUpperCase()}</div>
            <button style={styles.logoutBtn} onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ ...styles.logoutBtn, display: 'inline-block', textAlign: 'center' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}
