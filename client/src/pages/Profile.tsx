import React, { useState } from 'react';
import defaultImg from "../assets/pfp/default.jpeg";


const Profile = () => {
 

  return (
    <div>
      <p className='text-xl font-bold text-center p-2 border-b-2 border-neutral-700'>Profile</p>
      <img src={defaultImg} className='rounded-full max-h-[12em] max-w-[12em] mx-auto mt-4  object-scale-down' alt='pfp' />
      <p>Name</p>
      <p>Sandeep Prajapati</p>    
    </div>
  );
};

export default Profile;
