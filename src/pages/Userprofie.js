import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Userprofile.css";

function UserProfile() {
  const [user, setUser] = useState({
    Username: "",
    email: "",
    Phonenumber: "",
    Profileimg: "",
  });

  useEffect(() => {
    const handleGet = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("_id");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          `http://localhost:3005/api/user/users/${userId}`,
          { headers }
        );
        setUser(response.data.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    handleGet();
  }, []);
  const upadateuser = async () => {
    const userid = localStorage.getItem("_id");
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.put(`http://localhost:3005/api/user/update/${userid}`,{headers});

    if(response.status===200){
        setUser(response.data.data)
    }

    
  };

  return (
    <div>
      <div className="main">
        <div className="second">
            <button onClick={upadateuser}>update</button>

            
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
