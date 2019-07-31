import React from 'react';
import PropTypes from 'prop-types';

import withAppointments from './withAppointments';
import { convertToHours, toFriendlyHours } from '../utils/helpers';
import {
    APPOINTMENT_INCREMENTS,
    FIRST_HOUR,
    LAST_HOUR,
    TOTAL_HOURS_IN_A_DAY,
    MINUTES_IN_AN_HOUR
  } from '../utils/constants';


function TimeBlocks ({ timeSlot, isSet, onClick }) {
  return (
    <li
      key={timeSlot}
      className={`time-interval-minute ${isSet ? 'reserve' : 'available'}`}
      onClick={() => onClick(timeSlot)}
    />
  );
}

class DayView extends React.Component {

  state = {
    startTime: '',
    endTime: '',
    markedBlocks: {},
    timeBlocks: {}
  };

  componentDidMount () {
    const hours = [...Array(TOTAL_HOURS_IN_A_DAY).keys()].slice(FIRST_HOUR, LAST_HOUR);
    const minutes = [...Array(MINUTES_IN_AN_HOUR/APPOINTMENT_INCREMENTS).keys()];

    let timeBlocks = hours.reduce((acc, hour) => {
      let time = '';
      for (let i = 0; i < minutes.length; i++) {
        time = toFriendlyHours(hour, minutes[i] * APPOINTMENT_INCREMENTS);
        acc[time] = false;
      }

      return acc;
    }, {});

    this.setState({timeBlocks
    });
  }

  onClick = (val) => {
    this.setState((currState) => {
      const markedBlocks = currState.markedBlocks;

      if (markedBlocks[val]) {
        markedBlocks[val] = false;
      } else {
        markedBlocks[val] = true;
      }

      return { markedBlocks };
    }, () => console.log(this.state));
  }

  render () {
    const { markedBlocks, timeBlocks } = this.state;
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
                  {Object.entries(timeBlocks).map(({timeSlot, isSet}, idx) => (
                    <TimeBlocks
                      key={idx}
                      timeSlot={timeSlot}
                      isSet={isSet}
                      onClick={this.onClick}
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
}

export default withAppointments(DayView);