import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Release = () => {
  const [formData, setFormData] = useState({
    petName: '',
    age: '',
    breed: '',
    gender: '',
    healthInformation: '',
    reasonForReleasing: '',
    agreedToTerms: false
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setSubmissionSuccess(false);
    setSubmissionError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionSuccess(false);
    setSubmissionError('');

    const dataToSend = { ...formData };

    if (!formData.agreedToTerms) {
      setSubmissionError('You must agree to the terms to submit the form.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/release', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        setSubmissionSuccess(true);
        setFormData({
          petName: '',
          age: '',
          breed: '',
          gender: '',
          healthInformation: '',
          reasonForReleasing: '',
          agreedToTerms: false
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
    <div className="release-form">
      <h1>Pet Release Form</h1>
      <form className='form-container' onSubmit={handleSubmit}>
        <label>Pet's Name:</label>
        <input type="text" name="petName" value={formData.petName} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label>Breed:</label>
        <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Health Information:</label>
        <textarea name="healthInformation" value={formData.healthInformation} onChange={handleChange} rows="4" />

        <label>Reason for Releasing:</label>
        <textarea name="reasonForReleasing" value={formData.reasonForReleasing} onChange={handleChange} rows="4" required />

        <div className="checkbox-container" style={{ marginTop: '15px', marginBottom: '15px' }}>
          <input
            type="checkbox"
            id="agreedToTerms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreedToTerms" style={{ display: 'inline', marginLeft: '5px' }}>
            I understand that by submitting this form, I am relinquishing ownership of my pet.
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>

      {submissionSuccess && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>
          Pet release request submitted successfully! Redirecting...
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

export default Release;