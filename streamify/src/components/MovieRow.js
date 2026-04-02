import React, { useRef } from 'react';
import MovieCard from './MovieCard';

export default function MovieRow({ title, movies }) {
  const ref = useRef();

  const scroll = (dir) => {
    ref.current.scrollBy({ left: dir * 500, behavior: 'smooth' });
  };

  const styles = {
    section: { margin: '2rem 0' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 2rem' },
    title: { fontSize: '1.2rem', fontWeight: 700 },
    arrows: { display: 'flex', gap: '8px' },
    arrow: { background: '#1a1a1a', border: '1px solid #333', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    row: { display: 'flex', gap: '14px', overflowX: 'auto', padding: '0 2rem 1rem', scrollbarWidth: 'none' },
  };

  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
        <div style={styles.arrows}>
          <button style={styles.arrow} onClick={() => scroll(-1)}>‹</button>
          <button style={styles.arrow} onClick={() => scroll(1)}>›</button>
        </div>
      </div>
      <div ref={ref} style={styles.row}>
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
