import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleId = getRoleId(selectedRole);

    try {
      const response = await axios.post('http://localhost:3000/login', {
        ...formData,
        roleId,
      });

      if (response.status === 200) {
        navigate('/welcome');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('Invalid Entered Details. Please check again.');
       console.error(error);
    }
  };

  const getRoleId = (roleName) => {
    switch (roleName) {
      case 'Client':
        return 3;
      case 'Employee':
        return 4;
      default:
        return null;
    }
  };

  return (
    <div className='div1'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label><strong>Your Role</strong></label>
          <select
            name="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
          >
            <option value="">Roles</option>
            <option value="Client">Client</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Don't you have an Account <Link to="/signup">Sign up</Link></p>
        <button type="submit">Login</button>
        <div>
          <button>
            <Link id='l3' to="/">Home</Link>
          </button>
          <p>Admit  <Link  to="/loginNavigate" >Admit</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
