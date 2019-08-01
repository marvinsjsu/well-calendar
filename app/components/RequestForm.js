import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DayView from './DayView';
import Legend from './Legend';
import withAppointments from './withAppointments';
import { REQUEST_STATUS } from '../utils/constants';
import {
  createAppointmentID,
  createTimeBlocks,
  getStartTimeOptions,
  getEndTimeOptions,
  toMoment
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

    return (
      <div className='container__page'>
        <form className='form column wrap margin-top-lg' onSubmit={(this.handleSubmit)}>
          <div className='row'>
            <div className='column center'>
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
              <div className='row'>
                <label htmlFor='startTime' className='label'>
                  Start Time
                </label>
              </div>
              <div className='row'>
                <select
                  id='startTime'
                  className='input-date'
                  defaultValue={0}
                  value={startTime}
                  disabled={getStartTimeOptions(timeBlocks, appDate).length === 0}
                  onChange={this.handleChangeStartTime}
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
                  defaultValue={0}
                  value={endTime}
                  onChange={this.handleChangeEndTime}
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
                  disabled={!this.isReady()}
                >
                  Request Appointment
                </button>
              </div>
              <Legend />
            </div>
            <div className='row margin-left-med'>
              <DayView
                appDay={appDate}
                timeBlocks={timeBlocks}
                handleTimeBlockClick={this.handleTimeBlockClick}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withAppointments(RequestForm);
