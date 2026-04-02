import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) navigate('/');
    else setError(res.message);
  };

  const s = {
    page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f0f' },
    card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '400px' },
    logo: { fontSize: '1.8rem', fontWeight: 800, color: '#e50914', textAlign: 'center', marginBottom: '0.5rem' },
    subtitle: { color: '#888', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' },
    label: { display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px' },
    input: { width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '12px 16px', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '1.2rem', outline: 'none', boxSizing: 'border-box' },
    btn: { width: '100%', background: '#e50914', border: 'none', color: '#fff', padding: '13px', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' },
    error: { color: '#e50914', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' },
    switch: { textAlign: 'center', marginTop: '1.5rem', color: '#888', fontSize: '0.9rem' },
    switchLink: { color: '#e50914', fontWeight: 600, cursor: 'pointer' },
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>STREAMIFY</div>
        <p style={s.subtitle}>Welcome back! Sign in to continue</p>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Email</label>
          <input style={s.input} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <label style={s.label}>Password</label>
          <input style={s.input} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={s.btn} type="submit">Sign In</button>
        </form>
        <div style={s.switch}>
          Don't have an account? <Link to="/register" style={s.switchLink}>Register</Link>
        </div>
      </div>
    </div>
  );
}
