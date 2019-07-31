import React from 'react';
import PropTypes from 'prop-types';

import { convertToHours, toFriendlyHours } from '../utils/helpers';
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
  const hours = [...Array(TOTAL_HOURS_IN_A_DAY).keys()].slice(FIRST_HOUR, LAST_HOUR);
  const minutes = [...Array(MINUTES_IN_AN_HOUR/APPOINTMENT_INCREMENTS).keys()];

  return (
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
  );
}

export default DayView;