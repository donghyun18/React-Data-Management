import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-content'>
        <div className='footer-social'>
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>
        <div className='footer-contact'>
          <p>Contact us:</p>
          <p>hello@theme.com</p>
          <p>+65 4598 5902</p>
        </div>
      </div>
      <div className='footer-copyright'>
        &copy; 2024 ENVALABE All RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
