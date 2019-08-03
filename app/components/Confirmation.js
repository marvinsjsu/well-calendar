import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { toMoment } from '../utils/helpers';
import { ROUTES, LANGUAGE } from '../utils/constants';

export default function Confirmation ({ appDate, startTime, toStartAppRequest }) {
  const appointmentDate = toMoment(appDate, startTime).format('dddd, MMM Do, YYYY');

  return (
    <React.Fragment>
      <div className='flex-row request-flow u-margin-bottom-medium'>
        <p className='heading-tertiary u-margin-top-medium'>
          {LANGUAGE.CONFIRMATION_MESSAGE(appointmentDate)}
        </p>
        <div className='flex-row u-margin-top-small'>
          <button
            className='btn'
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
    </React.Fragment>
  );
}