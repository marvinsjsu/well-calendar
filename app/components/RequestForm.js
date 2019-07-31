import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DayView from './DayView';
import withAppointments from './withAppointments';
import { createAppointmentID, createTimeBlocks, getStartTimeOptions, getEndTimeOptions } from '../utils/helpers';
import { REQUEST_STATUS } from '../utils/constants';

class RequestForm extends React.Component {

  state = {
    appDate: '',
    startTime: '',
    endTime: '',
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
    }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { appDate, timeBlocks } = this.state;
    const { addAppointment } = this.props;
    const newTimeBlocks = {};

    for (let key in timeBlocks) {
      console.log(key, timeBlocks[key]);
      newTimeBlocks[key] = timeBlocks[key] === REQUEST_STATUS.REQUESTING
        ? REQUEST_STATUS.SUBMITTED
        : timeBlocks[key];
    }

    addAppointment({
      appDate,
      newTimeBlocks
    });

    this.setState({
      startTime: '',
      endTime: '',
      timeBlocks: newTimeBlocks
    });
  }

  handleChangeDate = (e) => {
    const { appDate, timeBlocks: newTimeBlocks } = this.state;
    const { appointments, addAppointment } = this.props;

    addAppointment({ appDate, newTimeBlocks });
    const newAppDate = moment(e.target.value, 'YYYY-MM-DD');

    this.setState({
      startTime: '',
      endTime: '',
      appDate: e.target.value,
      timeBlocks: appointments[e.target.value] || createTimeBlocks(newAppDate)
    });
  }

  // handleChangeTime = (key, e) => {
  //   const { appDate, timeBlocks: newTimeBlocks } = this.state;
  //   const { appointments, addAppointment } = this.props;

  //   newTimeBlocks[e.target.value] = REQUEST_STATUS.REQUESTING;
  //   addAppointment({ appDate, newTimeBlocks });

  //   this.setState({
  //     [key]: e.target.value,
  //     timeBlocks: newTimeBlocks
  //   });
  // }

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
      timeBlocks: newTimeBlocks
    });
  }

  handleChangeEndTime = (e) => {
    const { appDate, timeBlocks: newTimeBlocks, startTime } = this.state;
    const startMoment = moment(`${appDate} ${startTime}`, 'YYYY-MM-DD h:mma');
    const endMoment = moment(`${appDate} ${e.target.value}`, 'YYYY-MM-DD h:mma');
    let currBlock = '';

    for (let timeKey in newTimeBlocks) {
      currBlock = moment(`${appDate} ${timeKey}`, 'YYYY-MM-DD h:mma');
      if (currBlock.isBefore(endMoment)
        && newTimeBlocks[timeKey] === REQUEST_STATUS.AVAILABLE
        && currBlock.isAfter(startMoment)
        ) {
        newTimeBlocks[timeKey] = REQUEST_STATUS.REQUESTING;
      }
    }

    this.setState({
      endTime: e.target.value,
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
    }, () => console.log(this.state));
  }

  isReadyToBook = () => {
    const { appDate } = this.state;
    return true;
    // return appDate != undefined && startTime != undefined && endTime != undefined;
  }

  render () {
    const { appDate, startTime, endTime, earliestDate, earliestTime, timeBlocks } = this.state;

    return (
      <div className='container__page'>
        <h2 className=''>Appointment Request</h2>
        <form className='form column' onSubmit={(this.handleSubmit)}>
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
                  defaultValue={`- select -`}
                  onChange={this.handleChangeStartTime}
                >
                  <option key={0} disabled value={`- select -`}> - select - </option>
                  {timeBlocks && getStartTimeOptions(timeBlocks, appDate).map(([block, flag], idx) => (
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
                  onChange={this.handleChangeEndTime}
                >
                  <option key={0} disabled value={0}> - select - </option>
                  {timeBlocks && getEndTimeOptions(startTime, timeBlocks, appDate).map(([block, flag], idx) => (
                    <option key={block} value={block}>{block}</option>
                  ))}
                </select>
              </div>
              <div className='row'>
                <button
                  className='btn btn-submit'
                  type='submit'
                  disabled={!this.isReadyToBook()}
                >
                  Request Appointment
                </button>
              </div>
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
