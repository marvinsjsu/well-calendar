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

TimeBlocks.propTypes = {
  hour: PropTypes.number.isRequired,
  block: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  timeBlocks: PropTypes.object.isRequired,
  appDay: PropTypes.string.isRequired
};

function DayView ({ timeBlocks, handleTimeBlockClick, appDay }) {
  const hours = getHours();
  const minutes = getIncrements();

  return (
    <div className='grid-day'>
      <ul>
        {hours.map((hour) => (
          <li key={hour} className='time-block'>
            <div className='time-display'>
              {toFriendlyHours(hour, 0)}
            </div>
            <div className='time-interval'>
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
  );
}

DayView.propTypes = {
  timeBlocks: PropTypes.object.isRequired,
  handleTimeBlockClick: PropTypes.func.isRequired,
  appDay: PropTypes.string.isRequired
};

export default DayView;