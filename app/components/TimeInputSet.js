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
      <div className='flex-row'>
        <div className='flex-column time-container'>
          <div className='flex-row flex-row--align-left flex-row--mobile-align-right'>
            <label
              htmlFor='startTime'
              className={`label ${disableStartInput && 'disable'}`}
            >
              Start Time
            </label>
          </div>
          <div className='flex-row flex-row--align-left flex-row--mobile-align-right'>
            <select
              id='startTime'
              className='input-time'
              value={startTime}
              disabled={getStartTimeOptions(timeBlocks, appDate).length === 0}
              onChange={handleChangeStartTime}
            >
              <option
                key={'select'}
                disabled value={0}
              >
                - select -
              </option>
              {timeBlocks
                && getStartTimeOptions(timeBlocks, appDate).map(([block, flag], idx) => (
                <option
                  key={block}
                  value={block}
                >
                  {block}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex-column time-container'>
          <div className='flex-row flex-row--align-left flex-row--mobile-align-left'>
            <label
              htmlFor='startTime'
              className={`label ${startTime === '0' && 'disable'}`}
            >
              End Time
            </label>
          </div>
          <div className='flex-row flex-row--align-left flex-row--mobile-align-left'>
            <select
              id='endTime'
              className='input-time'
              value={endTime}
              onChange={handleChangeEndTime}
              disabled={startTime === '0'}
            >
              <option
                key={0}
                disabled
                value={0}
              >
                - select -
              </option>
              {startTime != null
                && timeBlocks
                && getEndTimeOptions(startTime, timeBlocks, appDate).map(([block, flag], idx) => (
                <option
                  key={block}
                  value={block}
                >
                  {block}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='flex-row u-margin-top-small u-margin-bottom-medium'>
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