import React from 'react';
import PropTypes from 'prop-types';

import AppointmentCard from './AppointmentCard';
import { toMoment } from '../utils/helpers';
import { LANGUAGE } from '../utils/constants';

export default function RequestSummary ({ appDate, startTime, endTime, cancelRequest, submitRequest }) {
  const appointmentDate = toMoment(appDate, startTime).format('dddd, MMM Do, YYYY');

  return (
    <React.Fragment>
      <h4 className='message'>
        {LANGUAGE.REQUEST_TITLE.CONFIRM_SUMMARY}
      </h4>
      <div className='flex-row u-margin-top-small'>
        <AppointmentCard
          appDate={appDate}
          startTime={startTime}
          endTime={endTime}
        />
      </div>
      <div className='flex-row u-margin-top-small u-margin-bottom-medium'>
        <button
          className='btn'
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