import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const PASSWORD_CHECKS = [
  { key: 'length', label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { key: 'upper', label: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { key: 'lower', label: 'One lowercase letter', test: (pw) => /[a-z]/.test(pw) },
  { key: 'number', label: 'One number', test: (pw) => /[0-9]/.test(pw) },
  { key: 'special', label: 'One special character', test: (pw) => /[^A-Za-z0-9]/.test(pw) }
];

const SignUp = () => {
  // 1 = name/email, 2 = code verification, 3 = password + register
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    code: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmissionError('');
  };

  const passedChecks = PASSWORD_CHECKS.filter((c) => c.test(formData.password));
  const strengthPercent = (passedChecks.length / PASSWORD_CHECKS.length) * 100;
  const strengthColor =
    passedChecks.length <= 2 ? '#e74c3c' : passedChecks.length < 5 ? '#f1c40f' : '#2ecc71';

  // STEP 1: request a verification code by email
  const handleSendCode = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    if (!formData.name || !formData.email) {
      setSubmissionError('Please enter your name and email.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/signup/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email })
      });
      const result = await response.json();
      if (response.ok) {
        setStep(2);
      } else {
        setSubmissionError(result.error || 'Could not send verification code.');
      }
    } catch (error) {
      console.error('❌ Error sending code:', error);
      setSubmissionError('Network error while sending the verification code.');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: confirm the 6-digit code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    if (!formData.code) {
      setSubmissionError('Please enter the code we emailed you.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/signup/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, code: formData.code })
      });
      const result = await response.json();
      if (response.ok) {
        setStep(3);
      } else {
        setSubmissionError(result.error || 'Verification failed.');
      }
    } catch (error) {
      console.error('❌ Error verifying code:', error);
      setSubmissionError('Network error while verifying the code.');
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: set the password and finish registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmissionError('');

    if (passedChecks.length < PASSWORD_CHECKS.length) {
      setSubmissionError('Please satisfy all password requirements.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setSubmissionError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      const result = await response.json();
      if (response.ok) {
        setSubmissionSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setSubmissionError(result.error || 'Signup failed.');
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      setSubmissionError('Signup failed due to a network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <form
        onSubmit={step === 1 ? handleSendCode : step === 2 ? handleVerifyCode : handleRegister}
        className="login-form"
      >
        <h1>Sign Up</h1>

        <div className="signup-steps">
          <span className={step >= 1 ? 'active' : ''}>1. Details</span>
          <span className={step >= 2 ? 'active' : ''}>2. Verify Email</span>
          <span className={step >= 3 ? 'active' : ''}>3. Password</span>
        </div>

        {step === 1 && (
          <>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="login-input"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

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

            <button type="submit" className="login-btn login-btn-outline" disabled={loading}>
              {loading ? 'Sending code...' : 'Send Verification Code'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="signup-hint">
              We sent a 6-digit code to <strong>{formData.email}</strong>. It expires in 10 minutes.
            </p>

            <label htmlFor="code">Verification Code</label>
            <input
              type="text"
              id="code"
              name="code"
              className="login-input"
              placeholder="123456"
              value={formData.code}
              onChange={handleChange}
              maxLength={6}
              required
            />

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
              type="button"
              className="login-btn signup-secondary-btn"
              onClick={handleSendCode}
              disabled={loading}
            >
              Resend Code
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="signup-hint">
              Email verified! Now set a password for <strong>{formData.email}</strong>.
            </p>

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

            <div className="password-strength-bar">
              <div
                className="password-strength-fill"
                style={{ width: `${strengthPercent}%`, backgroundColor: strengthColor }}
              />
            </div>

            <ul className="password-checklist">
              {PASSWORD_CHECKS.map((check) => (
                <li key={check.key} className={check.test(formData.password) ? 'met' : ''}>
                  {check.test(formData.password) ? '✓' : '✗'} {check.label}
                </li>
              ))}
            </ul>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="login-input"
              placeholder="Re-enter Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formData.confirmPassword && formData.confirmPassword !== formData.password && (
              <p className="signup-mismatch">Passwords do not match yet.</p>
            )}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </>
        )}
      </form>

      {submissionSuccess && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>
          Signup successful! Redirecting to login...
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

export default SignUp;
