import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const LoginNavigate = () => {
  const [formData, setFormData] = useState({ superAdminID: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/loginNavigate', formData);

      if (response.status === 200) {
        navigate('/welcome');
      } else {
        console.log('Login failed');
        setErrorMessage('An error occurred during login');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid SuperAdmin ID or password');
    }
  };

  return (
    <div className="div1">
      <h2>SuperAdmin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label><strong>SuperAdmin ID:</strong></label>
          <input
            type="text"
            name="superAdminID"
            value={formData.superAdminID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label><strong>Password:</strong></label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br />
        <button type="submit">Login</button>
        <div>
          <button>
            <Link id="l3" to="/">
              Home
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginNavigate;
