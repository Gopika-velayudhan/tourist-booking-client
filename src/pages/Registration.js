import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Registration.css';

const RegistrationSchema = Yup.object().shape({
  Username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  Phonenumber: Yup.string().required('Mobile number is required').min(10,'must be valid number'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Registration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3005/api/user/userregister', values, {
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
    setSubmitting(false);
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center register" style={{ minHeight: '100vh' }}>
        <div className='rounded shadow p-3 mb-5 bg-white fom' style={{ width: '25rem' }}>
          <h1 className='mt-3 welcome-heading'>Welcome to ExploreEpic</h1>
          <Formik
            initialValues={{ Username: '', email: '', Phonenumber: '', password: '' }}
            validationSchema={RegistrationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type='text' name='Username' placeholder='Username' className='form-control mt-3' />
                <ErrorMessage name='Username' component='div' className='text-danger' />

                <Field type='email' name='email' placeholder='Email' className='form-control mt-4' />
                <ErrorMessage name='email' component='div' className='text-danger' />

                <Field type='tel' name='Phonenumber' placeholder='Mobile number' className='form-control mt-4' />
                <ErrorMessage name='Phonenumber' component='div' className='text-danger' />

                <Field type='password' name='password' placeholder='Password' className='form-control mt-4' />
                <ErrorMessage name='password' component='div' className='text-danger' />

                <button className='btn btn-primary rounded mt-4 w-100' type='submit' disabled={isSubmitting || isLoading}>
                  {isSubmitting || isLoading ? 'Loading....' : 'SignUP'}
                </button>
                <p className='mt-4'>
                  Already have an account? <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Registration;
