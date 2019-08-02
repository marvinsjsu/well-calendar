import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { toMoment } from '../utils/helpers';
import { ROUTES, LANGUAGE } from '../utils/constants';

export default function Confirmation ({ appDate, startTime, toStartAppRequest }) {
  const appointmentDate = toMoment(appDate, startTime).format('dddd, MMM Do, YYYY');

  return (
    <div className='column request'>
      <div className='row message'>
        {LANGUAGE.CONFIRMATION_MESSAGE(appointmentDate)}
      </div>
      <div className='column'>
        <button
          className='link'
          onClick={toStartAppRequest}
        >
          Make another request
        </button>
        <Link
          className='link'
          to={ROUTES.HOME}
        >
          See existing requests
        </Link>
      </div>
    </div>
  );
}