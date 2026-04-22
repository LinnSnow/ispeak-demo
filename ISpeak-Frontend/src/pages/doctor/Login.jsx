import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--doc-bg)'
    }}>
      <div style={{
        backgroundColor: 'var(--doc-card)',
        padding: '48px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-soft)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ color: 'var(--doc-primary)', marginBottom: '8px' }}>ISpeak</h1>
          <p style={{ color: 'var(--doc-text-sec)' }}>Doctor Portal Login</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--doc-text-main)', fontSize: '14px', fontWeight: '500' }}>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%', padding: '12px',
                border: '1px solid var(--doc-border)', borderRadius: 'var(--radius-sm)',
                fontSize: '16px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--doc-text-main)', fontSize: '14px', fontWeight: '500' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '12px',
                border: '1px solid var(--doc-border)', borderRadius: 'var(--radius-sm)',
                fontSize: '16px'
              }}
            />
          </div>
          <button type="submit" style={{
            backgroundColor: 'var(--doc-primary)', color: '#FFF',
            padding: '14px', border: 'none', borderRadius: 'var(--radius-sm)',
            fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'
          }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
