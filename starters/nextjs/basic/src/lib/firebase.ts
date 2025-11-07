import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Connect to emulator in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
  } catch (error) {
    // Emulator already connected or not available
    console.log('Auth emulator connection skipped:', error);
  }
}

export { auth };
export default app;