import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from './img/hero-image.jpg'; 
import shelterImage from './img/shleter-image.jpg'; 

const Home = () => {
  return (
    <div className='homepage-container'>
      <div className='hero-section' style={{ backgroundImage: `url(${heroImage})` }}>
        <div className='hero-content'>
          <h1>Welcome to Pet Love</h1>
          <p>Pet Adoption is an Act of Love!</p>
          <p>Find a companion who will bring you unconditional joy and love. Start your journey here!</p>
          <Link to='/contact' className='contact-btn'>Contact Us</Link>
        </div>
      </div>

      
      <div className='introduction-section'>
        <div className='introduction-text'>
          <h2>Introduction</h2>
          <h3>Our Shelter</h3>
          <p>Our shelter is a safe haven for pets in need, providing a loving and caring environment until they find their forever homes. We are committed to rescuing, rehabilitating, and rehoming animals.</p>
          <p>Join us in making a difference in the lives of these animals. Explore our adoption program, volunteer opportunities, and more!</p>
        </div>
        <img src={shelterImage} alt='Shelter' className='introduction-image' />
      </div>

      <div className='pet-care-tips-section'>
      <h2>Pet Care Tips</h2>
      <p>Learn how to care for your furry friends! These essential tips and resources will help you provide a safe, happy, and healthy environment for your pet.</p>

     <div className='tips'>
      <div className='tip'>
          <h3>Grooming Basics</h3>
          <p>Regular grooming is essential to keep your pet clean and comfortable. Brush your pet’s coat, trim nails, and clean their ears regularly to prevent health issues.</p>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/wI9xARUzo1E" 
            title="Pet Grooming Basics"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>

        <div className='tip'>
          <h3>Healthy Nutrition</h3>
          <p>A balanced diet tailored to your pet’s needs is key to their health. Make sure to feed high-quality pet food and avoid harmful human foods.</p>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/d7laQ-a8K3Q "
            title="Pet Nutrition Tips"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
    </div>

    
  );
};

export default Home;
