import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  // Manage form data as a single state object
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // State for managing submission success/error messages
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear success/error messages on input change
    setSubmissionSuccess(false);
    setSubmissionError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSubmissionSuccess(false); // Clear previous success message
    setSubmissionError('');     // Clear previous error message

    try {
      // Send POST request to the server's Signup route (http://localhost:5001/signup)
      const response = await fetch('http://localhost:5001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Convert form data to JSON string for transmission
      });

      if (response.ok) { // If response status is 2xx (success)
        const result = await response.json();
        console.log('Server response:', result);
        setSubmissionSuccess(true); // Set success state
        // Clear form fields after successful submission
        setFormData({
          name: '',
          email: '',
          password: ''
        });

        // In a real application, you might store user info or a token here.
        // localStorage.setItem("name", formData.name); // Removed for security (don't store sensitive info)
        // localStorage.setItem("email", formData.email); // Removed for security
        // localStorage.setItem("password", formData.password); // Absolutely remove this for security

        // Redirect to the login page after 2 seconds (encourage user to log in)
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else { // If response status is an error (4xx, 5xx)
        const errorData = await response.json();
        console.error('❌ Server error:', errorData);
        setSubmissionError(`Signup failed: ${errorData.error || 'Unknown error from server.'}`);
      }
    } catch (error) { // Handle network errors or other fetch-related issues
      console.error('❌ Error submitting form:', error);
      setSubmissionError('Signup failed due to network error or other issues.');
    }
  };

  return (
    <div className="login-form-container"> {/* Retain existing class */}
      <form onSubmit={handleSubmit} className="login-form"> {/* Retain existing class */}
        <h1>Sign Up</h1>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name" // Add name attribute (matches formData key)
          className="login-input" // Retain existing class
          placeholder="Enter Full Name"
          value={formData.name} // Bind to formData.name
          onChange={handleChange} // Use handleChange
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email" // Add name attribute
          className="login-input" // Retain existing class
          placeholder="Enter Email"
          value={formData.email} // Bind to formData.email
          onChange={handleChange} // Use handleChange
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password" // Add name attribute
          className="login-input" // Retain existing class
          placeholder="Enter Password"
          value={formData.password} // Bind to formData.password
          onChange={handleChange} // Use handleChange
          required
        />

        <button type="submit" className="login-btn">Sign Up</button> {/* Retain existing class */}
      </form>

      {/* Submission success message */}
      {submissionSuccess && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>
          Signup successful! Redirecting to login...
        </p>
      )}

      {/* Submission error message */}
      {submissionError && (
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>
          {submissionError}
        </p>
      )}
    </div>
  );
};

export default SignUp;
