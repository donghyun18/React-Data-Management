import React from 'react'

const Contact = () => {
  return (
    <div className="contact-section">
    <h1>Contact Us</h1>
    <p>
      At Pet Heaven, we are here to assist you with any inquiries or support you may need.
      Whether you're interested in adoption, volunteering, or making a difference through donations,
      our team is dedicated to helping you make a positive impact on the lives of animals in need.
    </p>
    
    <div className="contact-cards">
      <div className="contact-card">
        <div className="icon">📍</div>
        <h3>OUR MAIN OFFICE</h3>
        <p>Clementi Broadway St Singapore, 57298</p>
      </div>
      
      <div className="contact-card">
        <div className="icon">📞</div>
        <h3>PHONE NUMBER</h3>
        <p>+65 4598 5902<br />888-0123-4567 (Toll Free)</p>
      </div>
      
      <div className="contact-card">
        <div className="icon">📠</div>
        <h3>FAX</h3>
        <p>1-234-567-8900</p>
      </div>
      
      <div className="contact-card">
        <div className="icon">✉️</div>
        <h3>EMAIL</h3>
        <p>hello@theme.com</p>
      </div>
    </div>
  </div>
  )
}

export default Contact