import { useState } from "react";
import { useParams } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify'


const Adminedit = ()=>{
  const [formdata,setformdata] = useState({

  })
    
        
    
    return (
        <div style={{ width: '100%', height: '40vh' }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">
                  <b>Duration</b>
                </th>
                <th scope="col">
                  <b> Price</b>
                </th>
                <th scope="col">
                  <b>Available_Date</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  
                  <input
                    type="text"
                    
                  
                  />
                </td>
                <td>
                  <input
                   type="number"
                  />
                </td>
                <td>
                  <input
                  type="date"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-success m-2 mt-5"
            
          >
            Save
          </button>
          <button type="button" className="btn btn-danger m-2 mt-5">
            Discard
          </button>
    </div>
    
    );

}

export default Adminedit