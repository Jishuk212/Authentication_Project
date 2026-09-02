import { useEffect, useState } from "react";

import api from "../services/api.js";
import useAuth from "../hooks/useAuth.js";
import Loading from "../components/Loading.jsx";

const Profile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile");

        if (response.data.success) {
          setProfile(response.data.user);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className="profile-page">
        <div className="profile-card">
          <div className="error-message">{error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h1>My Profile</h1>

          <p>Your account information</p>
        </div>

        {profile && (
          <div className="profile-info">
            <div className="profile-row">
              <span>Name</span>
              <strong>{profile.name}</strong>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>

            <div className="profile-row">
              <span>Role</span>
              <strong>{profile.role}</strong>
            </div>

            <div className="profile-row">
              <span>Verified</span>
              <strong>{profile.isVerified ? "Yes" : "No"}</strong>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;
