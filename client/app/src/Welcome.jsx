import { Link } from 'react-router-dom';
import React from 'react';
import './App.css';

const Welcome = () => {
  return (
    <div>
      <h2>Welcome </h2>
      <button>
              <Link id='l5' to="/">Home Page</Link>
            </button>
    </div>
  );
};

export default Welcome;
