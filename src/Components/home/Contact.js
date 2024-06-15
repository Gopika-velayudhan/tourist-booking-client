import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FadeLoader } from 'react-spinners';
import './Contact.css';
import instance from '../../axiosinterceptor/userinterrceptor';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Form Data Being Sent:', formData);
    try {
      const response = await instance.post('/api/user/send-email', formData);
      console.log('Email Sent Response:', response);
      toast.success('Email sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending email:', error.response?.data || error.message);
      toast.error('Error sending email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main1">
      <ToastContainer />
      <section className="contact1">
        <div className="content1">
          <h2>Contact Us</h2>
          <p>
            Welcome to the wonderland of all time, explore the beauty of Kerala
            through Dream Holidays and write your daily with more and more happy
            moments through Kerala Tour Packages.
          </p>
        </div>
        <div className="container1">
          <div className="contactInfo1">
            <div className="box1">
              <div className="icon1">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
              </div>
              <div className="text1">
                <h3>Address</h3>
                <p>
                  kinfra near road,
                  <br />
                  676317
                </p>
              </div>
            </div>
            <div className="box1">
              <div className="icon1">
                <i className="fa fa-phone" aria-hidden="true"></i>
              </div>
              <div className="text1">
                <h3>Phone</h3>
                <p>123-456-963</p>
              </div>
            </div>
            <div className="box1">
              <div className="icon1">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="text1">
                <h3>Email</h3>
                <p>abc@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="contactForm1">
            {loading ? (
              <FadeLoader color="blue" />
            ) : (
              <form onSubmit={handleSubmit}>
                <h2>Send Message</h2>
                <div className="inputBox1">
                  <input
                    type="text"
                    name="name"
                    required="required"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <span>Full Name</span>
                </div>
                <div className="inputBox1">
                  <input
                    type="email"
                    name="email"
                    required="required"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span>Email</span>
                </div>
                <div className="inputBox1">
                  <textarea
                    name="message"
                    required="required"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <span>Type your message</span>
                </div>
                <div className="inputBox1">
                  <input type="submit" value="Send" required="required" />
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
