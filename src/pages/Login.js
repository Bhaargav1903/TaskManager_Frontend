// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useContext(UserContext); // Access context to update user state
  const navigate = useNavigate();

  const [logIn, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await logIn({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      const token = res.data.LogIn; // JWT returned by the backend
      if (token) {
        localStorage.setItem('token', token); // Store the token in localStorage
        localStorage.setItem('email',formData.email);
        setUser({ email: formData.email }); // Update user context
        toast.success('Login successful!');
        navigate('/'); // Redirect to the Home Page
      } else {
        console.error('Login failed: No token received');
      }
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-primary text-center">Log In</h1>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'
          }`}
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
        {error && <p className="text-red-600 mt-4">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
