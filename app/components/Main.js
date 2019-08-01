import React from 'react';
import { Link } from 'react-router-dom';

import withAppointments from './withAppointments';
import { ROUTES } from '../utils/constants';

function Main ({ myAppointments }) {
  return (
    <div className='container__page'>
      <div className='column wrap margin-top-lg'>
        <div className='row'>
          <h2>My appointment requests</h2>
        </div>
        <div className='row'>
          <ul>
            { myAppointments.length > 0
              ? (myAppointments.map(({ appDate, startTime, endTime }) => (
                  <li key={`${appDate}${startTime}`}>
                    <div className='message'>
                      <ul>
                        <li>
                          <span className='detail'>{appDate}</span>
                        </li>
                        <li>
                          <span className='label'>Starts @ </span>
                          <span className='detail'>{startTime}</span>
                        </li>
                        <li>
                          <span className='label'>Ends @ </span>
                          <span className='detail'>{endTime}</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                )))
            : (
                <div className='column message'>
                  You currently don't have any appointment requests. <br />
                  <Link
                    className='link'
                    to={ROUTES.APPOINTMENT_REQUEST}
                  >
                    Make a request here
                  </Link>
                </div>
              )
          }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withAppointments(Main);
