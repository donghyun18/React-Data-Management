import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const Donation = () => {
  const [formData, setFormData] = useState({
    amount: '',
    donationType: '',
    cardNumber: ''
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
      const response = await fetch('http://localhost:5001/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        setSubmissionSuccess(true);
        setFormData({
          amount: '',
          donationType: '',
          cardNumber: ''
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
    <div className='donation-container'>
      <div className='donation-header'>
        <Link to='/services'><FaArrowLeft /> Back</Link>
      </div>

      <div className='donation-body'>
        <h1>Support Our Shelter</h1>
        
        <p>Your donation helps us provide food, medical care, and a safe environment for pets in need. Every contribution, big or small, makes a difference in the lives of these animals.</p>
        
        <h2>Ways to Donate</h2>
        <div className='donation-options'>
          <div className='donation-option'>
            <h3>One-Time Donation</h3>
            <p>Make a one-time donation to support immediate needs for food, shelter, and medical care.</p>
          </div>
          <div className='donation-option'>
            <h3>Monthly Donation</h3>
            <p>Become a recurring donor and help us provide ongoing care for our animals. Your support every month makes a lasting impact.</p>
          </div>
          <div className='donation-option'>
            <h3>Quarter Donation</h3>
            <p>Choose a pet to sponsor and cover their food, medical, and shelter once every quarter.</p>
          </div>
        </div>

        <div className='donation-form'>
          <h2>Make a Donation</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Donation Amount:
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="$50"
                required
              />
            </label>
            <label>
              Donation Type:
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="One-Time">One-Time</option>
                <option value="Monthly">Monthly Donation</option>
                <option value="Quarter">Quarter Donation</option>
              </select>
            </label>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
            </label>
            <button type="submit" className='donate-btn'>Donate Now</button>
          </form>
        </div>
        
        {submissionSuccess && (
          <div className='donation-thanks'>
            <p style={{ color: 'green', fontWeight: 'bold' }}>Thank you for your donation! Your support helps us provide essential care to our animals.</p>
          </div>
        )}

        {submissionError && (
          <div className='donation-thanks'>
            <p style={{ color: 'red', fontWeight: 'bold' }}>{submissionError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donation;
