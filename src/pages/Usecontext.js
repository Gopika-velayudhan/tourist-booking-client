// // UserContext.js
// import React, { createContext, useState } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState({
//     Profileimg: '',
//     Username: localStorage.getItem('Username') || '',
//     email: '',
//     Phonenumber: '',
//   });

//   const updateUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem('Username', userData.Username);
//   };

//   const clearUser = () => {
//     setUser({
//       Profileimg: '',
//       Username: '',
//       email: '',
//       Phonenumber: '',
//     });
//     localStorage.removeItem('Username');
//   };

//   return (
//     <UserContext.Provider value={{ user, updateUser, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
