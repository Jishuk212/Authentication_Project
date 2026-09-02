import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          AuthApp
        </Link>

        {/* Navigation */}
        <div className="navbar-links">
          <Link to="/">Home</Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>

              <Link to="/profile">Profile</Link>

              <span className="navbar-user">Hi, {user?.name}</span>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
