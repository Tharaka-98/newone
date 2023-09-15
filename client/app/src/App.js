import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import LoginNavigate from './LoginNavigate';
import Welcome from './Welcome';
import Home from './Home';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/loginnavigate" element={<LoginNavigate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
    </Router>
  );
}

export default App;
