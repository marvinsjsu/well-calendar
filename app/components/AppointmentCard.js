import React from 'react';
import PropTypes from 'prop-types';

import { toMoment } from '../utils/helpers';

export default function AppointmentCard ({ appDate, startTime, endTime, title }) {
  const appointmentDate = toMoment(appDate, startTime).format('ddd., MMM. Do, YYYY');

  return (
    <div className='card'>
      {title && (
        <h4 className='card__heading'>{title}</h4>
      )}
      <div className='card__details'>
        <ul>
          <li>{appointmentDate}</li>
          <li>Starts @ {startTime}</li>
          <li>Ends @ {endTime}</li>
        </ul>
      </div>
    </div>
  );
}

AppointmentCard.propTypes = {
  appDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  title: PropTypes.string,
};