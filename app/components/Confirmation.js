import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { toMoment } from '../utils/helpers';
import { ROUTES } from '../utils/constants';

export default function Confirmation ({ appDate, startTime, toStartAppRequest }) {
  const appointmentDate = toMoment(appDate, startTime).format('dddd, MMM Do, YYYY');

  return (
    <React.Fragment>
      <div className='row'>
        <div className='message'>
          Thank you! You're appointment request for {appointmentDate} has been submitted.
        </div>
      </div>
      <div className='row'>
        <button
          className='link'
          onClick={toStartAppRequest}
        >
          Make another request
        </button>
      </div>
      <div className='row'>
        <Link
          className='link'
          to={ROUTES.HOME}
        >
          Existing requests
        </Link>
      </div>
    </React.Fragment>
  );
}