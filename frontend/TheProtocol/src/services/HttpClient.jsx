import axios from 'axios';
import Cookies from 'js-cookie';

export const getBlocks = async () => {
  const token = Cookies.get('token');

  if (!token) {
    window.alert('You need to be logged in to use this service!');
  }

  try {
    const response = await axios.get(
      'http://localhost:5001/api/v1/blockchain',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
};

export const sendTransaction = async (sender, recipient, amount) => {
  const transactionData = {
    sender: sender,
    recipient: recipient,
    amount: amount,
  };
  const token = Cookies.get('token');

  if (!token) {
    window.alert('You need to be logged in to use this service!');
  }

  try {
    const response = await axios.post(
      'http://localhost:5001/api/v1/transaction',
      transactionData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
};

export const getTransactionPool = async () => {
  const response = await axios.get(
    'http://localhost:5001/api/v1/transaction/transactions'
  );
  return response.data;
};

export const mineBlock = async () => {
  const token = Cookies.get('token');

  if (!token) {
    window.alert('You need to be logged in to use this service!');
  }

  try {
    const response = await axios.get(
      'http://localhost:5001/api/v1/transaction/mine',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error mining block:', error);
    throw error;
  }
};

export const signUp = async (name, email, password) => {
  const signUpData = {
    name: name,
    email: email,
    password: password,
  };

  const response = await axios.post(
    'http://localhost:5001/api/v1/auth/register',
    signUpData
  );

  return response.data;
};

export const logIn = async (email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:5001/api/v1/auth/login',
      { email, password },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
