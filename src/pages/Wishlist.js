import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function Wishlist() {
  const [packag, setPackag] = useState([]);
  const handleSubmit = async(id)=>{
    try{
        const token = localStorage.getItem("token")

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
   
        if(!token){
            toast.error("user token is not found")
        }

        const response = await axios.post(`http://localhost:3005/api/user/wishlists/${id}`,
            {headers}

        )
        if(response.status == 201){

            toast.success(response.data.data)
            
            setPackag(response.data.data)

        }
        

    }catch(err){

    }

  }
  return (
    <div>
      <div>
        <h1 className="text-grey-400 font-semibold">My Dream World</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <div className="p-4">
                <h3 className="text-lg font-bold mb-2 ">
                    Destination
                </h3>
                <img src="" alt="image"></img>
                <p>Duration</p>
                <p>Available_Date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
