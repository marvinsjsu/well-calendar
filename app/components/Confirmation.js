import React from 'react';
import PropTypes from 'prop-types';

import { toMoment } from '../utils/helpers';

export default function Confirmation ({ appDate, startTime, makeAppointmentRequest }) {
  const appointmentDate = toMoment(appDate, startTime).format('dddd, MMM Do, YYYY');

  return (
    <div className='row'>
      <div className='message'>
        You're appointment request for {appointmentDate} has been submitted.  Thank you!

        <div className='row'>
          <button
            className='link'
            onClick={makeAppointmentRequest}
          >
            Set a new appointment request
          </button>
        </div>

      </div>
    </div>
  );
}