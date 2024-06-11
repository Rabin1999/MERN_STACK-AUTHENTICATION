// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await axios.post('http://localhost:8080/api/auth/signup', formData);
      console.log(response.data);
      alert('User registered successfully');
      // Clear form data after successful signup
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error registering user: ' + (error.response ? error.response.data.message : error.message));
      // Optionally clear form data after error
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
