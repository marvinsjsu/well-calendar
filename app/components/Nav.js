import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../utils/constants';

const activeStyle = {
  color: '#fc7038'
}

export default function Nav () {
  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <NavLink
            to={ROUTES.HOME}
            exact
            activeStyle={activeStyle}
            className='nav-link'
          >
            Existing Requests
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.APPOINTMENT_REQUEST}
            activeStyle={activeStyle}
            className='nav-link'
          >
            Create Request
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}