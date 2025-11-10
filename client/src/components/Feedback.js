import React from 'react';
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

const Feedback = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');

 
  const feedbacks = {
    "Taylor": [
      { comment: "Taylor did a fantastic job with organizing the event! Very professional and attentive to details.", rating: 5 },
      { comment: "Taylor was punctual and ensured everything ran smoothly. Great team player!", rating: 4 },
      { comment: "Taylor's communication skills made it easy for everyone to stay on the same page.", rating: 5 },
      { comment: "Handled unexpected issues calmly and effectively. Truly impressive under pressure.", rating: 4 },
      { comment: "Taylor’s dedication to the event’s success was evident. Highly recommend working with them.", rating: 5 },
      { comment: "Always available to answer questions and help with planning. Very approachable.", rating: 5 },
    ],
    "John Doe": [
      { comment: "John was very helpful and friendly. He went above and beyond to assist everyone.", rating: 5 },
      { comment: "John is incredibly reliable and proactive in solving problems. Highly recommend working with him.", rating: 5 },
      { comment: "John has great technical skills and was able to resolve issues quickly.", rating: 5 },
      { comment: "Always ready to lend a hand and provide support. A true asset to the team.", rating: 4 },
      { comment: "John’s patience and calm demeanor helped during a stressful project phase.", rating: 5 },
      { comment: "Provided insightful suggestions that improved the project's outcome.", rating: 5 },
    ],
    "Stacy": [
      { comment: "Stacy was supportive and did her best to assist in every way. She showed great empathy toward others.", rating: 4 },
      { comment: "Stacy was patient and handled challenging situations with professionalism. Very dedicated.", rating: 4 },
      { comment: "Her warm personality made everyone feel comfortable. Excellent with people.", rating: 5 },
      { comment: "Stacy’s organizational skills were a huge help in managing tasks effectively.", rating: 4 },
      { comment: "Always willing to go the extra mile to ensure everything was done right.", rating: 5 },
      { comment: "A pleasure to work with! Stacy remained upbeat and encouraging throughout.", rating: 5 },
    ],
  };
  

  // Get feedback details based on the name parameter
  const feedback = feedbacks[name];

  return (
    <div className='feedback-container'>
      <div className='feedback-header'>
        <Link to='/aboutus'><FaArrowLeft /> Back</Link>
      </div>
      <h1>Feedback for {name}</h1>
      <div className='reviews'>
      {feedback ? (
        feedback.map((entry, index) => (
          <div key={index} className='feedback-card'>
            <p>Comment: {entry.comment}</p>
            <div className='rating'>
              {Array(5).fill(0).map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`star ${i < entry.rating ? 'filled' : ''}`} 
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No review available for this person.</p>
      )}
      </div>
    </div>
  );
};

export default Feedback;







