import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api.js";
import useAuth from "../hooks/useAuth.js";
import Loading from "../components/Loading.jsx";

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/users/dashboard");

        if (response.data.success) {
          setDashboardData(response.data);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-card">
          <div className="error-message">{error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <section className="dashboard-header">
          <h1>Welcome, {user?.name} 👋</h1>

          <p>{dashboardData?.message || "Welcome to your dashboard"}</p>
        </section>

        {/* User Summary */}
        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h3>👤 Account</h3>

            <p>
              <strong>Name:</strong> {user?.name}
            </p>

            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>

          <div className="dashboard-card">
            <h3>🔐 Authentication</h3>

            <p>
              <strong>Status:</strong> Authenticated
            </p>

            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          </div>

          <div className="dashboard-card">
            <h3>🛡️ Security</h3>

            <p>Session-based authentication</p>

            <p>HTTP-only session cookie</p>
          </div>
        </section>

        {/* Actions */}
        <section className="dashboard-actions">
          <Link to="/profile" className="primary-button">
            View Profile
          </Link>

          <Link to="/" className="secondary-button">
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
