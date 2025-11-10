import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#f8d7be',
      color: '#333',
      borderBottom: '1px solid #e0e0e0'
    }}>
      <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Pet Heaven</Link>
      </div>
      <nav>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '20px' }}>
          <li><Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Home</Link></li>
          <li><Link to="/services" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Services</Link></li>
          <li><Link to="/aboutus" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>About Us</Link></li>
          <li><Link to="/contact" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Contact</Link></li>
          
          {isAuthenticated ? (
            <>
              <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Link to='/profile' style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'inherit' }}>
                  <FaUserCircle size={20} />
                  <span>{user?.name || 'Profile'}</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    padding: 0,
                    marginLeft: '10px'
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/signup" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Sign Up</Link></li>
              <li><Link to="/login" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
