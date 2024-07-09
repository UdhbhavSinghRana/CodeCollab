import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Activation({ setIsLoggedOut }) {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  console.log(localStorage.getItem('userInfo'));
  const token = JSON.parse(localStorage.getItem('userInfo'));

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:5000/api/activate-user', { activation_code: code, activation_token: token})
      .then((res) => {
        console.log(res.data);
        setIsLoggedOut(false);
        navigate('/')
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='border-2 p-6 rounded-lg shadow-lg'>
        <h1 className='text-2xl mb-4'>Enter Verification Code</h1>
        <input
          type='text'
          value={code}
          onChange={handleInputChange}
          className='border p-2 w-full mb-4'
          placeholder='Enter your code'
        />
        <button
          onClick={handleSubmit}
          className='bg-blue-500 text-white p-2 w-full rounded'
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Activation;
