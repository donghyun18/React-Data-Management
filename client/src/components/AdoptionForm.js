import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdoptionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferredPet: ''
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
      const response = await fetch('http://localhost:5001/adoption', {
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
          preferredPet: ''
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
    <div className="adoption-form">
      <h1>Adoption Form</h1>
      <form className='form-container' onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Preferred pet:</label>
        <select name="preferredPet" value={formData.preferredPet} onChange={handleChange}>
          <option value="">Select a pet</option>
          <option value="matilda">Matilda</option>
          <option value="elsie">Elsie</option>
          <option value="paula">Paula</option>
          <option value="maddie">Maddie</option>
          <option value="luke">Luke</option>
          <option value="bluey">Bluey</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      {submissionSuccess && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>
          Adoption request submitted successfully! Redirecting...
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

export default AdoptionForm;