import React from 'react';
import PropTypes from 'prop-types';

import { toMoment } from '../utils/helpers';

export default function AppointmentCard ({ appDate, startTime, endTime, title }) {
  const appointmentDate = toMoment(appDate, startTime).format('dddd, MMM Do, YYYY');

  return (
    <div className='appointment-card'>
      {title && (
        <h4 className='title'>{title}</h4>
      )}
      <ul>
        <li>On {appointmentDate}</li>
        <li>Starts @ {startTime}</li>
        <li>Ends @ {endTime}</li>
      </ul>
    </div>
  );
}

AppointmentCard.propTypes = {
  appDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  title: PropTypes.string,
};