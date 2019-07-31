import React from 'react';
import PropTypes from 'prop-types';

import { toFriendlyHours, getHours, getIncrements, isAfterNow } from '../utils/helpers';
import {
  APPOINTMENT_INCREMENTS,
  FIRST_HOUR,
  LAST_HOUR,
  TOTAL_HOURS_IN_A_DAY,
  MINUTES_IN_AN_HOUR,
  REQUEST_STATUS
} from '../utils/constants';


function TimeBlocks ({ hour, block, onClick, timeBlocks, appDay }) {
  const time = toFriendlyHours(hour, block * APPOINTMENT_INCREMENTS);
  const status = !isAfterNow(time, appDay) ? REQUEST_STATUS.UNAVAILABLE : timeBlocks[time];

  return (
    <li
      key={time}
      className={`time-interval--minute ${status}`}
      onClick={() => onClick(time)}
    />
  );
}

function DayView ({ timeBlocks, handleTimeBlockClick, appDay }) {
  const hours = getHours();
  const minutes = getIncrements();

  return (
    <React.Fragment>
      <div className='grid-day'>
        <ul>
          {hours.map((hour) => (
            <li key={hour} className='row space-between time-block'>
              <div className='time-display'>
                {toFriendlyHours(hour, 0)}
              </div>
              <div className='column time-interval'>
                <ul>
                  {minutes.map((val, idx) => (
                    <TimeBlocks
                      key={idx}
                      hour={hour}
                      block={val}
                      timeBlocks={timeBlocks}
                      appDay={appDay}
                      onClick={handleTimeBlockClick}
                    />
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className='legend'>
        <li className='available text-center'>Available</li>
        <li className='requesting text-center'>Requesting</li>
        <li className='submitted text-center'>Requested</li>
        <li className='unavailable text-center'>Time Passed</li>
      </ul>
    </React.Fragment>
  );
}

export default DayView;