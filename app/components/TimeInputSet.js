import React from 'react';
import PropTypes from 'prop-types';

import { getStartTimeOptions, getEndTimeOptions } from '../utils/helpers';

export default function TimeInputSet ({
  timeBlocks,
  appDate,
  startTime,
  endTime,
  handleChangeStartTime,
  handleChangeEndTime,
  isReady
}) {

  const disableStartInput = getStartTimeOptions(timeBlocks, appDate).length === 0;

  return (
    <React.Fragment>
      <div className='row'>
        <label htmlFor='startTime' className={`label ${disableStartInput && 'disable'}`}>
          Start Time
        </label>
      </div>
      <div className='row'>
        <select
          id='startTime'
          className='input-date'
          value={startTime}
          disabled={getStartTimeOptions(timeBlocks, appDate).length === 0}
          onChange={handleChangeStartTime}
        >
          <option key={'select'} disabled value={0}> - select - </option>
          {timeBlocks
            && getStartTimeOptions(timeBlocks, appDate).map(([block, flag], idx) => (
            <option key={block} value={block}>{block}</option>
          ))}
        </select>
      </div>
      <div className='row'>
        <label htmlFor='startTime' className={`label ${startTime === '0' && 'disable'}`}>
          End Time
        </label>
      </div>
      <div className='row'>
        <select
          id='endTime'
          className='input-date'
          value={endTime}
          onChange={handleChangeEndTime}
          disabled={startTime === '0'}
        >
          <option key={0} disabled value={0}> - select - </option>
          {startTime != null
            && timeBlocks
            && getEndTimeOptions(startTime, timeBlocks, appDate).map(([block, flag], idx) => (
            <option key={block} value={block}>{block}</option>
          ))}
        </select>
      </div>
      <div className='row'>
        <button
          className='btn btn-submit'
          type='submit'
          disabled={!isReady()}
        >
          Request Appointment
        </button>
      </div>
    </React.Fragment>
  );
}

TimeInputSet.propTypes = {
  timeBlocks: PropTypes.object.isRequired,
  appDate: PropTypes.string.isRequired,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  handleChangeStartTime: PropTypes.func.isRequired,
  handleChangeEndTime: PropTypes.func.isRequired,
  isReady: PropTypes.func.isRequired
};