import React from 'react';
import PropTypes from 'prop-types';

import { convertToHours, toFriendlyHours, getHours, getIncrements } from '../utils/helpers';
import {
  APPOINTMENT_INCREMENTS,
  FIRST_HOUR,
  LAST_HOUR,
  TOTAL_HOURS_IN_A_DAY,
  MINUTES_IN_AN_HOUR
} from '../utils/constants';


function TimeBlocks ({ hour, block, onClick, timeBlocks }) {
  const time = toFriendlyHours(hour, block * APPOINTMENT_INCREMENTS);

  return (
    <li
      key={time}
      className={`time-interval--minute ${timeBlocks[time]}`}
      onClick={() => onClick(time)}
    />
  );
}

function DayView ({ timeBlocks, handleTimeBlockClick }) {
  const hours = getHours();
  const minutes = getIncrements();

  return (
    <React.Fragment>
      <div className='grid-day'>
        <ul>
          {hours.map((hour) => (
            <li key={hour} className='row space-between time-block'>
              <div className='time-display'>
                {convertToHours(hour)}
              </div>
              <div className='column time-interval'>
                <ul>
                  {minutes.map((val, idx) => (
                    <TimeBlocks
                      key={idx}
                      hour={hour}
                      block={val}
                      timeBlocks={timeBlocks}
                      onClick={handleTimeBlockClick}
                    />
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul>
        <li className='available text-center'>Available</li>
        <li className='requesting text-center'>Requesting</li>
        <li className='submitted text-center'>Already Requested</li>
        <li className='unavailable text-center'>Unavailable</li>
      </ul>
    </React.Fragment>
  );
}

export default DayView;