import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSubmissionSuccess(false);
    setSubmissionError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionSuccess(false);
    setSubmissionError('');

    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        setSubmissionSuccess(true);
        setFormData({
          email: '',
          password: ''
        });

        login(result.token, result.user);

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('❌ Server error:', errorData);
        setSubmissionError(`Login failed: ${errorData.error || 'Unknown error from server.'}`);
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      setSubmissionError('Login failed due to network error or other issues.');
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="login-input"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="login-input"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-btn">Login</button>
      </form>

      {/* "Don't have an account? Sign up here" add link */}
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Sign up here</Link>
      </p>

      {submissionSuccess && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>
          Login successful! Redirecting...
        </p>
      )}

      {submissionError && (
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>
          {submissionError}
        </p>
      )}
    </div>
  );
};

export default Login;
