// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      console.log(response.data);
      alert('User logged in successfully');
      // Clear form data after successful login
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error logging in user: ' + (error.response ? error.response.data.message : error.message));
      // Optionally clear form data after error
      setFormData({
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
