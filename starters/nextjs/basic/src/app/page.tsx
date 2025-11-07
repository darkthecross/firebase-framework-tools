'use client';

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthForm from "../components/AuthForm";
import UserProfile from "../components/UserProfile";

export default function Home() {
  const message = process.env.NEXT_PUBLIC_MESSAGE || "Hello!";
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user } = useAuth();

  return (
    <main className="content">
      <h1 className="heading">Next.js on Firebase App Hosting</h1>
      <p>{message}</p>

      {/* Authentication Section */}
      <section style={{ margin: '40px 0', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Authentication Demo</h2>
        {user ? (
          <UserProfile />
        ) : (
          <AuthForm 
            mode={authMode}
            onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          />
        )}
      </section>

      <section className="features">
        <article className="card">
          <h2>Scalable, serverless backends</h2>
          <p>
            Dynamic content is served by{" "}
            <Link
              href="https://cloud.google.com/run/docs/overview/what-is-cloud-run"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloud Run
            </Link>
            , a fully managed container that scales up and down with demand.
            Visit{" "}
            <Link href="/ssr">
              <code>/ssr</code>
            </Link>{" "}
            and{" "}
            <Link href="/ssr/streaming">
              <code>/ssr/streaming</code>
            </Link>{" "}
            to see the server in action.
          </p>
        </article>
        <article className="card">
          <h2>Authentication & Protected Routes</h2>
          <p>
            Firebase Authentication is now integrated with this app. 
            {user ? (
              <>
                You are signed in! Visit the{" "}
                <Link href="/dashboard">
                  <code>/dashboard</code>
                </Link>{" "}
                to see a protected route in action.
              </>
            ) : (
              "Sign in above to access protected content."
            )}
          </p>
        </article>
        <article className="card">
          <h2>Global CDN</h2>
          <p>
            Cached content is served by{" "}
            <Link
              href="https://cloud.google.com/cdn/docs/overview"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Cloud CDN
            </Link>
            , a fast and secure way to host cached content globally. Visit
            <Link href="/ssg">
              {" "}
              <code>/ssg</code>
            </Link>{" "}
          </p>
        </article>
      </section>
    </main>
  );
}
