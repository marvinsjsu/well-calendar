import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../utils/constants';

export default function Nav () {
  return (
    <nav className='flex-row'>
      <ul className='navigation'>
        <li>
          <NavLink
            to={ROUTES.APPOINTMENT_REQUEST}
          >
            Create Request
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.HOME}
            exact
          >
            Existing Requests
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}