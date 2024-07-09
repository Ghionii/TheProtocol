import React from 'react';
import { signUp } from '../services/HttpClient';
import { useState } from 'react';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(name, email, password);
      console.log(response);
      window.alert('Your account has been made!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      window.alert('Something went wrong, try again.');
    }
  };

  return (
    <div className='signUpWrapper'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className='form-sign'>
        <div className='gap-sign'>
          <label>Name: </label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='gap-sign'>
          <label>Email: </label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='gap-sign'>
          <label>Password: </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='signUpButton'>
          Sign up
        </button>
      </form>
    </div>
  );
};
