import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginStudent.css';

function LoginStudent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/students/login', {
        email,
        password,
      });

      console.log(response.data);

      if (response.data.message === 'Email not exists') {
        alert('Email not exists');
      } else if (response.data.message === 'Login Success') {
        const studentId = response.data.studentId; // Ensure this matches the backend response key
        if (studentId) {
          navigate(`/students/${studentId}`); // Navigate to the profile page
        } else {
          alert('Failed to retrieve student ID.');
        }
      } else {
        alert('Incorrect email and password combination');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <hr />
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginStudent;
