import React, { useState } from 'react';
import axios from 'axios';

function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumbers = /\d/.test(password);
    
    return (password.length >= minLength && hasNumbers);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setUsernameError('');

    if (!validatePassword(password) || username.length < 3) {
      if (username.length < 3) {
        setUsernameError('Username must be at least 3 characters long.');
      }
      if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long and include at least one number.');
      }
      return;
    }


    try {
      await axios.post('http://localhost:5000/api/users/register', { username, email, password });    
      const loginResponse = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('userId', loginResponse.data.user.id);
      onRegisterSuccess(loginResponse.data.user);
    } catch (error) {
      setError(error.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        Register
      </button>
    </form>
  );
}

export default Register;