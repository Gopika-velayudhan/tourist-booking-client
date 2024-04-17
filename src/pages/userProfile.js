import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <div className="profile-details">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            </div>
            <div className="profile-image">
                <img src={user.imageUrl} alt="Profile" />
            </div>
        </div>
    );
};

export default UserProfile;
