import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const logOut = () => {
  Cookies.remove('token');
  window.alert('You are logged out');
  window.location.href = '/login';
};

export const Layout = () => {
  const token = Cookies.get('token');

  return (
    <>
      <div className='wrapper-nav'>
        <header className='header'>
          <nav className='nav-lefty'>
            <ul className='nav-left'>
              {token ? (
                <li>
                  <NavLink
                    to='#'
                    onClick={(e) => {
                      e.preventDefault();
                      logOut();
                    }}
                  >
                    Log out
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to={'/signup'}>Sign up</NavLink>
                  </li>
                  <span>||</span>
                  <li>
                    <NavLink to={'/login'}>Log in</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <h1 className='nav-h1'>
            <NavLink to={'/'}> The-Protocol</NavLink>
          </h1>
          <nav>
            <ul className='nav-right'>
              <li>
                <NavLink to={'/transactions'}>Blocks</NavLink>
              </li>
              <span>||</span>
              <li>
                <NavLink to={'/sendtransaction'}>Send Transaction</NavLink>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
