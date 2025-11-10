import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

import kennelcompanion from "./img/kennelcompanion.jpg";
import eventhelper from "./img/eventhelper.jpg";
import petsocializer from "./img/petsocializer.jpg";

const Volunteer = () => {
  const roles = [
    {
      name: "Pet Socializer",
      image: petsocializer,
      role: "The Pet Socializer helps animals, especially dogs and cats, become more comfortable interacting with people and develop social skills. This role involves spending time with animals, taking them for walks, playing, and providing basic training to encourage human interaction.",
      importance: "Animals in shelters may lack socialization, which can impact their adoptability. By interacting with them, Pet Socializers reduce stress and increase their chances of being adopted."
    },
    {
      name: "Event Helper",
      image: eventhelper,
      role: "Event Helpers assist in preparing and managing events related to shelters or pet adoption. They might help set up and break down events, explain information about adoptable pets, and guide visitors during events.",
      importance: "Event Helpers ensure smooth event operations, support shelter outreach efforts, and help increase public awareness about shelter animals and adoption.",
    },
    {
      name: "Kennel Companion",
      image: kennelcompanion,
      role: "A Kennel Companion spends time near the kennels of shelter dogs and cats, providing companionship and comfort. They aim to reduce animals’ loneliness and promote a sense of calm.",
      importance: "Spend quality time with pets in their kennels, offering comfort and interaction for a more positive experience.",
    },
  ];

  return (
    <div className='volunteer-container'>
      <div className='volunteer-header'>
        <Link to='/services'><FaArrowLeft /> Back</Link>
      </div>
      <div className='volunteer-body'>
        <h1>Volunteer Opportunities</h1>
        <div className='volunteer-roles'>
          {roles.map((role, index) => (
            <div key={index} className='volunteer-card'>
              <img src={role.image} alt={role.name} className='role-image' />
              <h2>{role.name}</h2>
              <p> Role: {role.role}</p>
              <p> Importance: {role.importance}</p>
              <a href="/volunteerform" className='volunteer-btn'>Volunteer Now</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Volunteer;

















