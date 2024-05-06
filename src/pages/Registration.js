import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    Username: '',
    email: '',
    Phonenumber: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3005/api/user/userregister', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response && response.status === 201) {
        console.log(response);
        toast.success('Registration Success');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center register" style={{ minHeight: '100vh' }}>
        <div className='rounded shadow p-3 mb-5 bg-white fom' style={{ width: '25rem' }}>
          <form onSubmit={handleSubmit}>
            <h1 className='mt-3 welcome-heading'>
              Welcome to ExploreEpic
            </h1>
            <input className='form-control mt-3' type='text' name='Username' value={formData.Username} placeholder='Username' required onChange={handleChange} />
            <br />
            <input className='form-control mt-4' type='email' name='email' value={formData.email} placeholder='Email' required onChange={handleChange} />
            <br />
            <input className='form-control mt-4' type='tel' name='Phonenumber' value={formData.Phonenumber} placeholder='Mobile number' required onChange={handleChange} />
            <br />
            <input className='form-control mt-4' type='password' name='password' value={formData.password} placeholder='Password' required onChange={handleChange} />
            <br />

            <button className='btn btn-primary rounded mt-4 w-100' disabled={isLoading}>
              {isLoading ? 'Loading....' : 'SignUP'}
            </button>
            <p className='mt-4'>
              Already have an account? <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
