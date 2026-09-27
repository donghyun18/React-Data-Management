import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    availability: ''
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const navigate = useNavigate();

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
      const response = await fetch('http://localhost:5001/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        setSubmissionSuccess(true);
        setFormData({
          name: '',
          email: '',
          role: '',
          availability: ''
        });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('❌ Server error:', errorData);
        setSubmissionError(`Submission failed: ${errorData.error || 'Unknown error from server.'}`);
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      setSubmissionError('Submission failed due to network error or other issues.');
    }
  };

  return (
    <div className="volunteer-form">
      <h1>Volunteer Form</h1>
      <form className='form-container' onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Preferred Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select a role</option>
          <option value="pet-socializer">Pet Socializer</option>
          <option value="event-helper">Event Helper</option>
          <option value="kennel-companion">Kennel Companion</option>
        </select>

        <label>Availability:</label>
        <input
          type="text"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          placeholder="e.g., Weekends, Mon-Wed afternoons"
        />

        <button type="submit">Submit</button>
      </form>

      {submissionSuccess && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>
          Volunteer request submitted successfully! Redirecting...
        </p>
      )}

      {submissionError && (
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
          {submissionError}
        </p>
      )}
    </div>
  );
};

export default VolunteerForm;