import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TimeInputSet from './TimeInputSet';
import DayView from './DayView';
import Legend from './Legend';
import withAppointments from './withAppointments';
import { REQUEST_STATUS } from '../utils/constants';
import {
  createTimeBlocks,
  getStartTimeOptions,
  getEndTimeOptions,
  toMoment,
  hasNoAvailableTimeBlocks
} from '../utils/helpers';

class RequestForm extends React.Component {

  state = {
    appDate: '',
    startTime: undefined,
    endTime: undefined,
    earliestDate: '',
    earliestTime: '',
    timeBlocks: {}
  }

  componentDidMount () {
    const { appointments } = this.props;
    const now = moment();
    const earliestDate = now.format('YYYY-MM-DD');
    const earliestTime = now.format('h:mma');
    const timeBlocks = appointments[earliestDate] || createTimeBlocks(now);

    this.setState({
      appDate: earliestDate,
      earliestDate,
      earliestTime,
      timeBlocks
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { appDate, timeBlocks } = this.state;
    const { addAppointment } = this.props;
    const newTimeBlocks = {};

    for (let key in timeBlocks) {
      newTimeBlocks[key] = timeBlocks[key] === REQUEST_STATUS.REQUESTING
        ? REQUEST_STATUS.SUBMITTED
        : timeBlocks[key];
    }

    addAppointment({
      appDate,
      newTimeBlocks
    });

    this.setState({
      startTime: 0,
      endTime: 0,
      timeBlocks: newTimeBlocks
    });
  }

  handleChangeDate = (e) => {
    const { appDate, timeBlocks: newTimeBlocks } = this.state;
    const { appointments, addAppointment } = this.props;

    addAppointment({ appDate, newTimeBlocks });
    const newAppDate = moment(e.target.value, 'YYYY-MM-DD');

    this.setState({
      startTime: 0,
      endTime: 0,
      appDate: e.target.value,
      timeBlocks: appointments[e.target.value] || createTimeBlocks(newAppDate)
    });
  }

  handleChangeStartTime = (e) => {
    const { appDate, timeBlocks: newTimeBlocks } = this.state;
    const { appointments, addAppointment } = this.props;

    for (let propKey in newTimeBlocks) {
      if (newTimeBlocks[propKey] === REQUEST_STATUS.REQUESTING) {
        newTimeBlocks[propKey] = REQUEST_STATUS.AVAILABLE;
      }
    }

    newTimeBlocks[e.target.value] = REQUEST_STATUS.REQUESTING;
    addAppointment({ appDate, newTimeBlocks });

    this.setState({
      startTime: e.target.value,
      endTime: 0,
      timeBlocks: newTimeBlocks
    });
  }

  handleChangeEndTime = (e) => {
    const { appDate, timeBlocks: newTimeBlocks, startTime } = this.state;
    const startMoment = toMoment(appDate, startTime);
    const endMoment = toMoment(appDate, e.target.value);

    this._resetBlocks();

    let currBlock = '';
    for (let timeKey in newTimeBlocks) {
      currBlock = toMoment(appDate, timeKey);
      if (currBlock.isBefore(endMoment)
        && newTimeBlocks[timeKey] === REQUEST_STATUS.AVAILABLE
        && !currBlock.isBefore(startMoment)
        ) {
        newTimeBlocks[timeKey] = REQUEST_STATUS.REQUESTING;
      }
    }

    this.setState({
      endTime: e.target.value,
      timeBlocks: newTimeBlocks
    });
  }

  _resetBlocks = () => {
    const { timeBlocks: newTimeBlocks } = this.state;

    for (let timeKey in newTimeBlocks) {
      if (newTimeBlocks[timeKey] === REQUEST_STATUS.REQUESTING) {
        newTimeBlocks[timeKey] = REQUEST_STATUS.AVAILABLE;
      }
    }

    this.setState({
      timeBlocks: newTimeBlocks
    });
  }

  handleTimeBlockClick = (val) => {
    const { addAppointment } = this.props;

    this.setState((currState) => {
      const timeBlocks = currState.timeBlocks;

      switch(timeBlocks[val]) {
        case REQUEST_STATUS.REQUESTING:
          timeBlocks[val] = REQUEST_STATUS.AVAILABLE;
          break;
        case REQUEST_STATUS.UNAVAILABLE:
          timeBlocks[val] = REQUEST_STATUS.UNAVAILABLE;
          break;
        case REQUEST_STATUS.SUBMITTED:
          timeBlocks[val] = REQUEST_STATUS.SUBMITTED;
          break;
        default:
          timeBlocks[val] = REQUEST_STATUS.REQUESTING;
          break;
      }

      return { timeBlocks };
    });
  }

  isReady = () => {
    const { appDate, startTime, endTime } = this.state;

    if (appDate === '') return false;
    if (startTime == undefined || startTime === 0 || !startTime) return false;
    if (endTime == undefined || endTime === 0 || !endTime) return false;

    return true;
  }

  render () {
    const { appDate, startTime, endTime, earliestDate, earliestTime, timeBlocks } = this.state;
    const nonAvailable = hasNoAvailableTimeBlocks(timeBlocks);

    return (
      <div className='container__page'>
        <form className='form column wrap margin-top-lg' onSubmit={(this.handleSubmit)}>
          <div className='row'>
            <div className='column padding-top-md input-container'>
              <div className='row'>
                <label htmlFor='appDate' className='label'>
                  Date
                </label>
              </div>
              <div className='row'>
                <input
                  type='date'
                  id='appDate'
                  className='input-date'
                  value={appDate}
                  min={earliestDate}
                  autoComplete='false'
                  onChange={this.handleChangeDate}
                />
              </div>

              {nonAvailable
                ? (
                    <div className='message'>
                      Sorry, but there are no longer
                      any available appointments for
                      this day. Please feel free to
                      pick another day.
                    </div>
                  )
                : (<TimeInputSet
                    timeBlocks={timeBlocks}
                    appDate={appDate}
                    startTime={startTime}
                    endTime={endTime}
                    handleChangeStartTime={this.handleChangeStartTime}
                    handleChangeEndTime={this.handleChangeEndTime}
                    isReady={this.isReady}
                   />
                  )
              }
            </div>
            <div className='row margin-left-med'>
              <div className='column'>
                <DayView
                  appDay={appDate}
                  timeBlocks={timeBlocks}
                  handleTimeBlockClick={this.handleTimeBlockClick}
                />
              </div>
            </div>
          </div>
        </form>
        <Legend />
      </div>
    );
  }
}

export default withAppointments(RequestForm);
