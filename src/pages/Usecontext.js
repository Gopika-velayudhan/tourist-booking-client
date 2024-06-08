import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileImg, setProfileImg] = useState(localStorage.getItem("profileImg") || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");

  useEffect(() => {
    if (profileImg) {
      localStorage.setItem("profileImg", profileImg);
    }
  }, [profileImg]);

  return (
    <UserContext.Provider value={{ profileImg, setProfileImg }}>
      {children}
    </UserContext.Provider>
  );
};
