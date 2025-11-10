import React from 'react'
import { Link } from 'react-router-dom'
import cat1 from './img/cat1.jpg'
import cat2 from './img/cat2.jpg'



const Services = () => {
  return (
    <div className="services-containers">
      <div className="services-menu">
          <Link to='/adopt'> Adoption </Link>
          <Link to='/release'> Release Pet </Link>
          <Link to='/donation'> Donation </Link>
          <Link to='/volunteer' >Volunteer</Link> 
          


      </div>
      <div className='service-sections'>
        <div className='service-section1'>
        <img src={cat1} className='service-section1-img'/>

          <div className='service-section1-text'>
            <h2>Bring home a new friend and give a loving pet a second chance at happiness. Explore our list of adoptable pets, each waiting for a caring home like yours.</h2>
            <Link to='/adopt' className='service-section1-btn'>Adopt Now</Link>
          </div>
        </div>
        <div className='service-section2'>
          <div className='service-section2-text'>
            <h2>Your generous donation helps provide shelter, food, and medical care to animals in need. Join us in making a difference—every contribution brings hope and healing.</h2>
            <Link to='/donation' className='service-section1-btn'>Donate Now</Link>
          </div>
          <img src={cat2} className='service-section2-img'/>
        </div>
        <div className='service-section3'>
          <div className='service-section3-header'>
            <h2>We Need Volunteers</h2>
          </div>
          <div className='service-section3-body'>
            <section>
              <h3>Pet Socializer</h3>
              <p>Helps animals, like dogs and cats, improve social skills through human interaction. By spending time with the animals, Pet Socializers help them feel more comfortable around people and reduce their stress levels.</p>
              <Link to='/volunteerform'>Volunteer Now</Link>
            </section>
            <section>
              <h3>Event Helper</h3>
              <p>Assists in setting up, managing, and supporting pet adoption or shelter events. Event Helpers ensure events run smoothly and help create a welcoming experience for visitors.</p>
              <Link to='/volunteerform'>Volunteer Now</Link>
            </section>
            <section>
              <h3>Kennel Companion</h3>
              <p>Sit with animals in their kennels, talk to them, and provide some company. This relaxed role allows you to be there for animals who need a little extra companionship.</p>
              <Link to='/volunteerform'>Volunteer Now</Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services