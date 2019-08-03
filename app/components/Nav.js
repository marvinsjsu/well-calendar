import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../utils/constants';

export default function Nav () {
  return (
    <nav className='flex-row'>
      <ul className='navigation'>
        <li>
          <NavLink
            to={ROUTES.HOME}
            exact
          >
            Create Request
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.MY_APPOINTMENTS}
            exact
          >
            Existing Requests
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}