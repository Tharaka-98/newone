import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    telephone: '',
  });

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errorsCopy = { ...errors };
    let isValid = true;

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      errorsCopy.email = 'Invalid email format';
      isValid = false;
    } else {
      errorsCopy.email = '';
    }

    // Validate password format (at least 8 characters, with at least one uppercase letter, one lowercase letter, and one digit)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errorsCopy.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.';
      isValid = false;
    } else {
      errorsCopy.password = '';
    }

    setErrors(errorsCopy);
    return isValid;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('/register', formData);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Registration failed:', error.response.data.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If the form is not valid, do not submit
    }

    const countryId = getCountryId(selectedCountry);
    const roleId = getRoleId(selectedRole);

    try {
      const response = await axios.post('http://localhost:3000/register', {
        ...formData,
        countryId,
        roleId,
      });
      // Handle success and redirection here
      navigate('/login');
      console.log(response.data.message);
    } catch (error) {
      // Handle registration error here
      console.error(error.response.data.error);
    }
  };

  const getRoleId = (roleName) => {
    switch (roleName) {
      case 'Client':
        return 3;
      case 'Employee':
        return 4;
      // Add more cases for other countries
      default:
        return null;
    }
  };

  const getCountryId = (countryName) => {
    switch (countryName) {
      case 'Sri Lanka':
        return 1;
      case 'New Zealand':
        return 2;
      case 'Canada':
        return 3;
      // Add more cases for other countries
      default:
        return null;
    }
  };

  return (
    <div className='div1'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label><strong>Your Role</strong></label>
          <select
            name="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
          >
            <option value="">Select Your Role</option>
            <option value="Client">Client</option>
            <option value="Employee">Employee</option>
            
            {/* Add more options for other countries */}
          </select>
          </div>
        <div>
        <label htmlFor="firstname"><strong>FirstName</strong></label>
          <input type="text" name="firstname" value={formData.firstName} placeholder="First Name" onChange={handleChange} required /></div>
        <div>
        <label htmlFor="lastname"><strong>LastName</strong></label>
          <input type="text" name="lastname" value={formData.lastName} placeholder="Last Name" onChange={handleChange} required /></div>
        <div><label htmlFor="lastname"><strong>Email</strong></label>
          <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />{errors.email && <span > {errors.email}</span>}</div>
        <div><label htmlFor="password"><strong>Password</strong></label>
          <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} required /> {errors.password && <span> {errors.password}</span>}</div>
        <div><label htmlFor="telephone"><strong>Telephone</strong></label>
          <input type="text" name="telephone" value={formData.phoneNumber} placeholder="Telephone (optional)" onChange={handleChange} /></div>
          <div>
          <label><strong>Country</strong></label>
          <select
            name="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
          >
            <option value="">Select your Country</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Canada">Canada</option>
            
            
            {/* Add more options for other countries */}
          </select>
          </div>
          <div><button type="submit" >Register</button></div>
          <div><button><Link id='l3' to="/">Back</Link></button></div>
          
          <p>Do you have an Account  <Link  to="/login" >Login</Link></p>
          <p>Admit  <Link  to="/loginNavigate" >Admit</Link></p>
          
      </form>
    </div> 
  );
};

export default Register;
