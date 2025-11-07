'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px' 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px' 
      }}>
        {fallback || (
          <div>
            <h2>Authentication Required</h2>
            <p>Please sign in to access this content.</p>
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;