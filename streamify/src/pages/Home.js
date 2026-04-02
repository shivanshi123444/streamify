import React from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { useTrending, usePopular, useTopRated } from '../hooks/useMovies';

export default function Home() {
  const { data: trending, loading: t1 } = useTrending();
  const { data: popular, loading: t2 } = usePopular();
  const { data: topRated, loading: t3 } = useTopRated();

  if (t1 || t2 || t3) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontSize: '1.1rem', color: '#888' }}>
      Loading movies... 🎬
    </div>
  );

  return (
    <div>
      <Hero movie={trending[0]} />
      <MovieRow title="🔥 Trending This Week" movies={trending} />
      <MovieRow title="🌟 Popular Movies" movies={popular} />
      <MovieRow title="🏆 Top Rated" movies={topRated} />
    </div>
  );
}
