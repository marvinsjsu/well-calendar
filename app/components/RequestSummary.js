import React from 'react';
import PropTypes from 'prop-types';

import { toMoment } from '../utils/helpers';

export default function RequestSummary ({ appDate, startTime, endTime, cancelRequest, submitRequest }) {
  const appointmentDate = toMoment(appDate, startTime).format('dddd, MMM Do, YYYY');

  return (
    <div className='row'>
      <div className='message'>
        Here's a quick summary of your appointment request.
        <ul>
          <li>
            <span className='detail'>{appointmentDate}</span>
          </li>
          <li>
            <span className='label'>Starts @ </span>
            <span className='detail'>{startTime}</span>
          </li>
          <li>
            <span className='label'>Ends @ </span>
            <span className='detail'>{endTime}</span>
          </li>
          <li>
            <div className='row'>
              <button
                className='btn btn-cancel'
                onClick={cancelRequest}
              >
                Cancel
              </button>

              <button
                className='btn btn-continue'
                onClick={submitRequest}
              >
                Continue
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

RequestSummary.propTypes = {
  appDate: PropTypes.string.isRequired,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  cancelRequest: PropTypes.func.isRequired,
  submitRequest: PropTypes.func.isRequired
}