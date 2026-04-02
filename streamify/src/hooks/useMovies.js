import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE = process.env.REACT_APP_TMDB_BASE_URL;
const KEY = process.env.REACT_APP_TMDB_API_KEY;

const api = axios.create({ baseURL: BASE, params: { api_key: KEY } });

export const useTrending = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get('/trending/movie/week').then(r => { setData(r.data.results); setLoading(false); });
  }, []);
  return { data, loading };
};

export const usePopular = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get('/movie/popular').then(r => { setData(r.data.results); setLoading(false); });
  }, []);
  return { data, loading };
};

export const useTopRated = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get('/movie/top_rated').then(r => { setData(r.data.results); setLoading(false); });
  }, []);
  return { data, loading };
};

export const useMovieDetails = (id) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    Promise.all([
      api.get(`/movie/${id}`),
      api.get(`/movie/${id}/credits`),
      api.get(`/movie/${id}/similar`),
    ]).then(([m, c, s]) => {
      setMovie(m.data);
      setCast(c.data.cast.slice(0, 10));
      setSimilar(s.data.results.slice(0, 6));
      setLoading(false);
    });
  }, [id]);
  return { movie, cast, similar, loading };
};

export const useSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!query || query.length < 2) { setResults([]); return; }
    setLoading(true);
    const timer = setTimeout(() => {
      api.get('/search/movie', { params: { query } })
        .then(r => { setResults(r.data.results); setLoading(false); });
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);
  return { results, loading };
};
