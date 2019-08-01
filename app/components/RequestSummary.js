import React from 'react';
import PropTypes from 'prop-types';

export default function RequestSummary ({ appDate, startTime, endTime, cancelRequest, submitRequest }) {

  return (
    <div className='row'>
      <ul>
        <li>Summary of Appointment Request</li>
        <li>
          <span className='label'>Date:</span>
          <span className='detail'>{appDate}</span>
        </li>
        <li>
          <span className='label'>Start Time:</span>
          <span className='detail'>{startTime}</span>
        </li>
        <li>
          <span className='label'>End Time:</span>
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
  );
}

RequestSummary.propTypes = {
  appDate: PropTypes.string.isRequired,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  cancelRequest: PropTypes.func.isRequired,
  submitRequest: PropTypes.func.isRequired
}