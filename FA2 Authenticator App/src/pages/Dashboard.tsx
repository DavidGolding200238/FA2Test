import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Logout } from '../utils/authUtils';
import DashboardContent from '../components/DashboardContent';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { authenticated, loading } = useAuth();

  useEffect(() => {
    console.log('Dashboard: Checking authentication', { authenticated, loading });
    if (!authenticated && !loading) {
      console.log('Dashboard: Redirecting to /login');
      navigate('/login');
    }
  }, [authenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardContent />
      <button onClick={() => {
        console.log('Dashboard: Logging out');
        Logout();
        navigate('/login');
      }}>
        Logout
      </button>
      <button onClick={() => {
        console.log('Dashboard: Navigating to login without logout');
        navigate('/login');
      }}>
        Go to Login
      </button>
    </div>
  );
};

export default Dashboard;