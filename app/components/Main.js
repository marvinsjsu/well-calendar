import React from 'react';
import { Link } from 'react-router-dom';

import withAppointments from './withAppointments';
import { ROUTES } from '../utils/constants';

function Main ({ appointments, madeAppointments}) {
  return (
    <div className='container'>
      <div className='row center'>
        <Link
          className='link text-lg'
          to={ROUTES.APPOINTMENT_REQUEST}
        >
          Make an appointment request
        </Link>
        <Link
          className='link text-lg'
          to={ROUTES.MY_APPOINTMENTS}
        >
          My existing appointment requests
        </Link>
      </div>
    </div>
  );
}

export default withAppointments(Main);
