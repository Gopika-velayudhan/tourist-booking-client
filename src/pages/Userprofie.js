import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from './Userprofile.module.css';
import { FadeLoader } from 'react-spinners';
import instance from '../../src/axiosinterceptor/userinterrceptor';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../pages/Usecontext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Profileimg: '',
    Username: '',
    email: '',
    Phonenumber: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { setProfileImg } = useContext(UserContext);

  useEffect(() => {
    const handleGet = async () => {
      try {
        const userId = localStorage.getItem('_id');
        const response = await instance.get(`/api/user/users/${userId}`);
        const userData = response.data?.data || {};
        setUser({
          Profileimg: userData.Profileimg || '',
          Username: userData.Username || '',
          email: userData.email || '',
          Phonenumber: userData.Phonenumber || '',
        });
        setProfileImg(userData.Profileimg || '');
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
    handleGet();
  }, [setProfileImg]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = localStorage.getItem('_id');
      const formData = new FormData();
      formData.append('Username', user.Username);
      formData.append('email', user.email);
      formData.append('Phonenumber', user.Phonenumber);
      if (image) {
        formData.append('Profileimg', image);
      }
      const response = await instance.put(`/api/user/users/${userId}`, formData);
      const updatedUserData = response.data?.data || {};
      setUser((prevUser) => ({
        ...prevUser,
        Profileimg: updatedUserData.Profileimg || '',
        Username: updatedUserData.Username || '',
        email: updatedUserData.email || '',
        Phonenumber: updatedUserData.Phonenumber || '',
      }));
      setProfileImg(updatedUserData.Profileimg || '');
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile', err);
      toast.error(err.response?.data?.error || 'Error updating profile');
    } finally {
      setLoading(false);
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
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={() => navigate('/')}>
          &times;
        </span>
        <ToastContainer />
        <div className={styles.formContainer}>
          <h2>Profile</h2>
          <div className={styles.photoContainer} onClick={handleImageClick}>
            <img
              src={user.Profileimg || 'default-profile-img.png'}
              alt="Profile"
              className={styles.profilePhoto}
            />
          </div>
          <form className={styles.form1} onSubmit={handleUpdate}>
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
            {loading ? (
              <div className="d-flex justify-content-center">
                <FadeLoader color="#007bff" loading={loading} size={15} />
              </div>
            ) : (
              <button type="submit" className={styles.submitButton}>
                Update
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
