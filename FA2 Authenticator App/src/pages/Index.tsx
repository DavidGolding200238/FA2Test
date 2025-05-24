import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authUtils';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { authenticated, loading } = useAuth();

  useEffect(() => {
    if (authenticated && !loading) {
      navigate('/dashboard');
    }
  }, [authenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() =>  navigate('/login')}>Go to Login</button>
      <button onClick={() => navigate('/register')}>Go to Register</button> {/* Added */}
    </div>
  );
};  

export default Index;