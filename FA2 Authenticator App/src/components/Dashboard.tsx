import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/authUtils';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };
    
    return (
        <div>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
export default Dashboard;