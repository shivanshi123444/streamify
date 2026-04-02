import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import { usePopular, useTopRated, useTrending, useSearch } from '../hooks/useMovies';

const GENRES = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller'];

export default function Movies() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [tab, setTab] = useState('popular');

  const { data: popular } = usePopular();
  const { data: topRated } = useTopRated();
  const { data: trending } = useTrending();
  const { results: searchResults, loading: searching } = useSearch(query);

  const getMovies = () => {
    if (query) return searchResults;
    if (tab === 'popular') return popular;
    if (tab === 'top') return topRated;
    return trending;
  };

  const movies = getMovies();

  const styles = {
    page: { padding: '2rem', minHeight: '100vh' },
    header: { marginBottom: '2rem' },
    h1: { fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' },
    controls: { display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' },
    searchInput: { flex: 1, minWidth: '200px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '10px 18px', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' },
    tabs: { display: 'flex', gap: '8px' },
    tab: (active) => ({ background: active ? '#e50914' : '#1a1a1a', border: '1px solid ' + (active ? '#e50914' : '#333'), color: '#fff', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: active ? 700 : 400 }),
    genres: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' },
    gBtn: (active) => ({ background: active ? '#fff' : 'transparent', color: active ? '#000' : '#aaa', border: '1px solid ' + (active ? '#fff' : '#333'), padding: '5px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: active ? 600 : 400 }),
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '18px' },
    empty: { textAlign: 'center', color: '#555', marginTop: '4rem', fontSize: '1rem' },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.h1}>Browse Movies</h1>

      <div style={styles.controls}>
        <input style={styles.searchInput} placeholder="🔍  Search any movie..." value={query} onChange={e => setQuery(e.target.value)} />
        {!query && (
          <div style={styles.tabs}>
            {[['popular','🌟 Popular'],['top','🏆 Top Rated'],['trending','🔥 Trending']].map(([key, label]) => (
              <button key={key} style={styles.tab(tab === key)} onClick={() => setTab(key)}>{label}</button>
            ))}
          </div>
        )}
      </div>

      <div style={styles.genres}>
        {GENRES.map(g => <button key={g} style={styles.gBtn(genre === g)} onClick={() => setGenre(g)}>{g}</button>)}
      </div>

      {searching && <div style={styles.empty}>Searching...</div>}

      {!searching && movies.length === 0 && (
        <div style={styles.empty}>No movies found. Try a different search! 🎬</div>
      )}

      <div style={styles.grid}>
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
