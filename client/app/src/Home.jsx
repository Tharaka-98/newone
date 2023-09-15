import React from 'react'
import { Link } from 'react-router-dom'
import './App.css';

function Home() {
  return (
    <div>
      <div className='divh1'>
        Z-Tech Digital (Pvt)Ltd
      </div>
        <div className='divh2'>
            <label>Features</label>
            <label>Careers</label>
            <label>About Us</label>
            <label>Contact Us</label>
            <label><Link to="/signup" id="l1">Sign Up</Link></label>
            <label><Link to="/login" id="l2">Login</Link></label>
        </div>
    </div>
  )
}

export default Home