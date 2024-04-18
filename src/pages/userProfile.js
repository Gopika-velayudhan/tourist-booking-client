import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


function UserProfile() {
    const location = useLocation()

    const Username = location.state.Username
    const Email = location.state.Email
    const Phonenumber = location.state.Phonenumber
    
  return (
    <>
    <div>
         
      <div className="container d-flex justify-content-center align-items-center register " style={{ minHeight: '100vh' }}>
        <div className='rounded shadow p-3 mb-5 bg-white fom' style={{ width: '25rem' }}>
          <form>
            <h1 className='mt-3' style={{ fontFamily: 'inherit' }}>
              
            </h1>
            <input className='form-control mt-3' type='text' name='Username'  />
            <br />
            <input className='form-control mt-4' type='email' name='Email'    />
            <br />
            <input className='form-control mt-4' type='tel' name='Phonenumber'  />
            <br />

            

            
            <p className='mt-4'>
              Already have an account? <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
            </p>
          </form>
        </div>
      </div>
   
    </div>
    </>
  )
}

export default UserProfile