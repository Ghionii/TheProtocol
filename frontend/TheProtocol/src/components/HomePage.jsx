import React from 'react';
import GetOneBlock from './GetOneBlock';

export const Homepage = () => {
  return (
    <div className='container'>
      <div className='landing-page'>
        <h1>Welcome To The-Protocol</h1>
        <div>
          Welcome to my project! This website showcases a complete blockchain
          implementation for a custom cryptocurrency, developed as part of a
          school assignment.
        </div>
        <h3>Project Description</h3>
        <div>
          This project involves building a fully functional blockchain for a
          custom cryptocurrency, featuring transaction management and
          validation. The primary objectives of this assignment are to
          demonstrate the understanding of blockchain technology and to
          implement various components required for a secure and decentralized
          ledger.
          <p>Thank you for visiting!</p>
        </div>
        <h1>PS. You need to be logged in to use any of the services!</h1>
      </div>

      <div className='h3-wrap'>
        <h3>
          Try to pick out one block from the chain by choosing a block Index
          (number)
          <GetOneBlock />
        </h3>
      </div>
    </div>
  );
};
