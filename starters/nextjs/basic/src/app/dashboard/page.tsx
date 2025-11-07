'use client';

import { useAuth } from "../../contexts/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="content">
        <h1 className="heading">Protected Dashboard</h1>
        <p>Welcome to your dashboard, {user?.displayName || user?.email}!</p>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f0f8ff', 
          borderRadius: '8px', 
          margin: '20px 0' 
        }}>
          <h2>Your Account Information</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Email:</strong> {user?.email}
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Display Name:</strong> {user?.displayName || 'Not set'}
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>User ID:</strong> {user?.uid}
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Email Verified:</strong> {user?.emailVerified ? 'Yes' : 'No'}
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Account Created:</strong> {user?.metadata?.creationTime}
            </li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link 
            href="/"
            style={{
              padding: '12px 24px',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    </ProtectedRoute>
  );
}