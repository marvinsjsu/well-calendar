import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { ConnectionConsumer } from '../contexts/connection';
import { ROUTES } from '../utils/constants';

export default function Nav () {
  return (
    <ConnectionConsumer>
      {({ connected }) => (
        <nav className='flex-row--space-between'>
          {!connected
            ?
              (
                <div className='warning u-center-text'>
                  Sorry, but the application is offline!
                </div>
              )
            : (
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
              )
          }
        </nav>
      )}
    </ConnectionConsumer>
  );
}
