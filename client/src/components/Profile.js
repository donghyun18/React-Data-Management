import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Profile = () => {
    const { user, logout: authLogout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        authLogout();
        navigate('/');
    };

    if (!user) {
        return (
            <div className='profile' style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Loading user data...</h1>
                <p>If you are not logged in, please <Link to="/login">log in</Link>.</p>
            </div>
        );
    }

  return (
    <div className='profile' style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Name: {user.name}</h1>
        <h3>Email: {user.email}</h3>
        <button
            onClick={handleLogout}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px'
            }}
        >
            Log Out
        </button>
    </div>
  );
};

