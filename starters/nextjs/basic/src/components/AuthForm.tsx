'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onToggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>{mode === 'login' ? 'Sign In' : 'Sign Up'}</h2>
      
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '16px', 
          padding: '8px', 
          border: '1px solid red', 
          borderRadius: '4px' 
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mode === 'signup' && (
          <div>
            <label htmlFor="displayName" style={{ display: 'block', marginBottom: '8px' }}>
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required={mode === 'signup'}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Loading...' : (mode === 'login' ? 'Sign In' : 'Sign Up')}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '16px' }}>
        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={onToggleMode}
          style={{
            background: 'none',
            border: 'none',
            color: '#0070f3',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          {mode === 'login' ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;