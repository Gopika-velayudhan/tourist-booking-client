import React from "react";

function UserProfile() {

  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center register" style={{ minHeight: "100vh" }}>
        <div className="rounded shadow p-3 mb-5 bg-white fom" style={{ width: "25rem" }}>
          <h1 className="mt-3" style={{ fontFamily: "inherit" }}>User Profile</h1>
          <div>
            <p>Username: {userData?.Username}</p>
            <p>Email: {userData?.Email}</p>
            <p>Phone Number: {userData?.Phonenumber}</p>
          
            {/* {/* <img src={userData?.profileImageUrl} alt="Profile" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
