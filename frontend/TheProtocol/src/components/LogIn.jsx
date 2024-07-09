import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { logIn } from '../services/HttpClient';

export const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await logIn(email, password);
      Cookies.set('token', response.token);
      window.alert('You are logged in');
      setEmail('');
      setPassword('');
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      window.alert('Something went wrong, try again.');
    }
  };

  return (
    <div className='loginWrapper'>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className='form-login'>
        <div className='gap-login'>
          <label>Email: </label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='gap-login'>
          <label>Password: </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='loginButton'>Log in</button>
      </form>
    </div>
  );
};
