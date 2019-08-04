import React from 'react';
import PropTypes from 'prop-types';

import AppointmentCard from './AppointmentCard';
import { toMoment } from '../utils/helpers';

export default function RequestSummary ({ appDate, startTime, endTime, cancelRequest, submitRequest }) {
  const appointmentDate = toMoment(appDate, startTime).format('dddd, MMM Do, YYYY');

  return (
    <React.Fragment>
      <div className='flex-row request-flow'>
        <AppointmentCard
          appDate={appDate}
          startTime={startTime}
          endTime={endTime}
          title={`Here's a quick summary of your request.`}
        />
      </div>
      <div className='flex-row u-margin-top-small u-margin-bottom-medium'>
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
    </React.Fragment>
  );
}

RequestSummary.propTypes = {
  appDate: PropTypes.string.isRequired,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  cancelRequest: PropTypes.func.isRequired,
  submitRequest: PropTypes.func.isRequired
}