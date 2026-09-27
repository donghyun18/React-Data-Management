import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

import dog1 from "./img/dog1.jpg";
import dog2 from "./img/dog2.jpg";
import dog3 from "./img/dog3.jpg";
import cats1 from "./img/cats1.jpg";
import cats2 from "./img/cats2.jpg";
import cats3 from "./img/cats3.jpg";

const Adopt = () => {
  const pets = [
    { name: "Matilda", breed: "Cocker Spaniel",age: 2, gender: "Male", tip: "Provide Individual Space", photo: dog1 },
    { name: "Elsie", breed: "Shiba Inu", age: 3, gender: "Male", tip: "Manage Mealtimes", photo: dog2 },
    { name: "Paula", breed: "Poodle", age: 4, gender: "Female", tip: "Understand Personality Differences", photo: dog3 },
    { name: "Maddie", breed:"Siamese", age: 3, gender: "Female", tip: "Balance Playtime", photo: cats1 },
    { name: "Luke", breed:"Persian", age: 2, gender: "Male", tip: "Health Care and Vaccinations", photo: cats2 },
    { name: "Bluey", breed:"Maine Coon", age: 3, gender: "Female", tip: "Maintain Cleanliness", photo: cats3 },
  ];

  return (
    <div className='adopt-container'>
      <div className='adopt-header'>
        <Link to='/services'><FaArrowLeft /> Back</Link>
      </div>
      <div className='adopt-body'>
        <h1>Adoption</h1>
        <div className='pet-grid'>
          {pets.map((e, index) => (
            <div key={index} className='pet-card'>
              <img src={e.photo} alt={`${e.name}'s photo`} className='pet-photo' />
              <div className='pet-info'>
                <h2>Name: {e.name}</h2>
                <p>Age: {e.age}</p>
                <p>Breed: {e.breed}</p>
                <p>Gender: {e.gender}</p>
                <p>Caring Tip: {e.tip}</p>
                <Link to='/adoptionform'>
                <button className='adopt-button'>Adopt</button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adopt;





