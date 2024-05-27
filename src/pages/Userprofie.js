import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Userprofile.module.css';
import instance from '../axiosinterceptor/userinterrceptor';
import { toast } from 'react-toastify';

function UserProfile() {
  const [user, setUser] = useState({
    Profileimg: '',
    Username: '',
    email: '',
    Phonenumber: '',
  });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleGet = async () => {
      try {
        // const token = localStorage.getItem('token');
        const userId = localStorage.getItem('_id');
        // const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await instance.get(
          `/users/${userId}`,
         
        );
        const userData = response.data?.data || {};
        setUser({
          Profileimg: userData.Profileimg || '',
          Username: userData.Username || '',
          email: userData.email || '',
          Phonenumber: userData.Phonenumber || '',
        });
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
    handleGet();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('_id');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const formData = new FormData();
      formData.append('Username', user.Username);
      formData.append('email', user.email);
      formData.append('Phonenumber', user.Phonenumber);
      if (image) {
        formData.append('Profileimg', image);
      }

      const response = await instance.put(
        `/users/${userId}`,
        formData
      
      );

      const updatedUserData = response.data?.data || {};
      setUser((prevUser) => ({
        ...prevUser,
        Profileimg: updatedUserData.Profileimg || '',
        Username: updatedUserData.Username || '',
        email: updatedUserData.email || '',
        Phonenumber: updatedUserData.Phonenumber || '',
      }));

      // Show a success message
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile', err);
    }
  };

  const handleDelete = async () => {
    try {
      
      const userId = localStorage.getItem('_id');
      
      await instance.delete(`/users/${userId}`);

      toast('Account deleted successfully');
      window.location.href = '/login';
    } catch (err) {
      console.error('Error deleting account', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUser((prevState) => ({
          ...prevState,
          Profileimg: reader.result,
        }));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  

  return (
    <div className={styles['form-container']}>
      <h2>Profile</h2>
      <div className={styles['photo-container']} onClick={handleImageClick}>
        <img
          src={user.Profileimg || 'default-profile-img.png'}
          alt="Profile"
          className={styles['profile-photo']}
        />
      </div>
      <form className={styles['form1']} onSubmit={handleUpdate}>
        <input
          type="text"
          name="Username"
          placeholder="Username"
          value={user.Username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="Phonenumber"
          placeholder="Phone number"
          value={user.Phonenumber}
          onChange={handleChange}
        />
        <input
          type="file"
          name="Profileimg"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <button type="submit" className={styles['submit-button']}>
          Update
        </button>
      </form>
      {/* <button onClick={handleDelete} className={styles['delete-button']}>
        Delete Account
      </button> */}
      <p  className={styles['delete-button']}  onClick={handleDelete}>delete the account</p>
    </div>
  );
}

export default UserProfile;
