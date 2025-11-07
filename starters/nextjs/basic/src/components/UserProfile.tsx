'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px' 
    }}>
      <h2>Welcome!</h2>
      <div style={{ marginBottom: '16px' }}>
        <p><strong>Email:</strong> {user.email}</p>
        {user.displayName && (
          <p><strong>Display Name:</strong> {user.displayName}</p>
        )}
        <p><strong>User ID:</strong> {user.uid}</p>
        <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
      </div>
      
      <button
        onClick={handleLogout}
        style={{
          padding: '12px 24px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;