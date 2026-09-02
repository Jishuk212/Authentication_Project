import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <main className="home-page">
      <section className="home-hero">
        <h1>Welcome to AuthApp</h1>

        <p>
          A secure authentication application built with React, Express, MongoDB
          and express-session.
        </p>

        {isAuthenticated ? (
          <>
            <h2>Welcome back, {user?.name} 👋</h2>

            <div className="home-actions">
              <Link to="/dashboard" className="primary-button">
                Go to Dashboard
              </Link>

              <Link to="/profile" className="secondary-button">
                View Profile
              </Link>
            </div>
          </>
        ) : (
          <div className="home-actions">
            <Link to="/login" className="primary-button">
              Login
            </Link>

            <Link to="/register" className="secondary-button">
              Create Account
            </Link>
          </div>
        )}
      </section>

      <section className="home-features">
        <div className="feature-card">
          <h3>🔐 Secure Authentication</h3>
          <p>Session-based authentication using express-session.</p>
        </div>

        <div className="feature-card">
          <h3>🍪 HTTP-Only Cookies</h3>
          <p>Authentication session is maintained using secure cookies.</p>
        </div>

        <div className="feature-card">
          <h3>🛡️ Protected Routes</h3>
          <p>Private pages are accessible only to authenticated users.</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
