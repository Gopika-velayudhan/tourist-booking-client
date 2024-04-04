import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Registration.css';
import { toast } from 'react-toastify';

function Registration() {
  const navigate = useNavigate();

  
  const validationSchema = Yup.object().shape({
    Username: Yup.string().required("username is required"),
    Email: Yup.string().email('Invalid email format').required("email is required"),
    Phonenumber: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required("phonenumber is required"),
    Password: Yup.string().required("password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const otpResponse = await axios.post(
        'http://localhost:3002/api/user/sendotp',
        { Phonenumber: values.Phonenumber }
      );
      if (otpResponse && otpResponse.data && otpResponse.data.success) {
        toast.success('Registration successful. OTP sent.');
        navigate('/sendotp', { state: { formData: values } });
      } else {
        toast.error(otpResponse.data.message);
      }
      console.log(otpResponse);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center register" style={{ minHeight: '100vh' }}>
      <div className="rounded shadow p-3 mb-5 bg-white form" style={{ width: '25rem' }}>
        <h1 style={{ fontWeight: 'bold' }}>Sign Up</h1>
        <Formik
          initialValues={{
            Username: '',
            Email: '',
            Phonenumber: '',
            Password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="Username" placeholder="Username" className="form-control mt-3" />
              <ErrorMessage name="Username" component="div" className="error" />

              <Field type="email" name="Email" placeholder="Email" className="form-control mt-4" />
              <ErrorMessage name="Email" component="div" className="error" />

              <Field type="tel" name="Phonenumber" placeholder="Mobile number" className="form-control mt-4" />
              <ErrorMessage name="Phonenumber" component="div" className="error" />

              <Field type="password" name="Password" placeholder="Password" className="form-control mt-4" />
              <ErrorMessage name="Password" component="div" className="error" />

              <button type="submit" className="btn btn-primary rounded mt-4 w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Sign up'}
              </button>

              <p className="mt-4">
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
