// import React, { useState } from "react";

// function UserProfile() {
  

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault()
    
//   };

//   return (
//     <>
//       <div className="container d-flex justify-content-center align-items-center register" style={{ minHeight: "100vh" }}>
//         <div className="rounded shadow p-3 mb-5 bg-white fom" style={{ width: "25rem" }}>
//           <h1 className="mt-3" style={{ fontFamily: "inherit" }}>User Profile</h1>
//           {isEditing ? (
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="Username" className="form-label">Username:</label>
//                 <input type="text" className="form-control" id="Username" name="Username" value={userData.Username || ""} onChange={handleInputChange} />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="Email" className="form-label">Email:</label>
//                 <input type="email" className="form-control" id="Email" name="Email" value={userData.Email || ""} onChange={handleInputChange} />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="Phonenumber" className="form-label">Phone Number:</label>
//                 <input type="tel" className="form-control" id="Phonenumber" name="Phonenumber" value={userData.Phonenumber || ""} onChange={handleInputChange} />
//               </div>
//               <button type="submit" className="btn btn-primary">Save</button>
//             </form>
//           ) : (
//             <div>
//               <p>Username: {userData?.Username}</p>
//               <p>Email: {userData?.Email}</p>
//               <p>Phone Number: {userData?.Phonenumber}</p>
//               <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserProfile;
