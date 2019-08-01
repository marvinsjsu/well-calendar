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

  return (
    <React.Fragment>
      <div className='row'>
        <label htmlFor='startTime' className='label'>
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
        <label htmlFor='startTime' className='label'>
          End Time
        </label>
      </div>
      <div className='row'>
        <select
          id='endTime'
          className='input-date'
          value={endTime}
          onChange={handleChangeEndTime}
          disabled={!startTime}
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