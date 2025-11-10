import React from 'react'
import pet1 from './img/pet1.jpg'
import p1 from './img/p1.jpg'
import p2 from './img/p2.jpg'
import p3 from './img/p3.jpg'
import { Link } from 'react-router-dom'


const Aboutus = () => {
  return (
    <div className='about-container'>
      <div className='about-header'>
       <section>
        <h1>About Us</h1>
        <p>Welcome to <span>Pet Heaven</span> We're a dedicated team of pet lovers on a mission to provide the best care, comfort, and companionship for your furry family members. At Pet Heaven, we believe that pets are more than just animals—they’re family. Our goal is to create a safe, loving, and joyful environment where your pets feel right at home. Whether you’re looking for trusted care or expert advice, we're here to support you and your pet every step of the way.</p>
        <Link to='/adopt' className='about-btn'>Adopt Now</Link>
       </section>
       <img src={pet1} className='about-img'/>
      </div>
      
      <div className='members'>
        <h1 className='members-title'>Our Members</h1>
        <div className='member'>
          <div>
            <img src={p1}/>
            <h1>John Doe</h1>
            <p>Presedent</p>
            <Link to='/feedback?name=John%20Doe' className='feedback-btn'>Feedback</Link>
          </div>
          <div>
            <img src={p2}/>
            <h1>Taylor</h1>
            <p>Vice Presiden</p>
            <Link to='/feedback?name=Taylor' className='feedback-btn'>Feedback</Link>
          </div>
          <div>
            <img src={p3}/>
            <h1>Stacy</h1>
            <p>Secretary</p>
            <Link to='/feedback?name=Stacy' className='feedback-btn'>Feedback</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Aboutus