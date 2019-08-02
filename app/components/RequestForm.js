import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TimeInputSet from './TimeInputSet';
import DateInput from './DateInput';
import DayView from './DayView';
import Legend from './Legend';
import RequestSummary from './RequestSummary';
import Confirmation from './Confirmation';
import AppointmentCard from './AppointmentCard';
import withAppointments from './withAppointments';
import { REQUEST_STATUS, NO_AVAILABILITY_MESSAGE } from '../utils/constants';
import {
  getCalendarFromLocalStorage,
  getMyAppointmentsFromLocalStorage
} from '../utils/localStorage';
import {
  createTimeBlocks,
  getStartTimeOptions,
  getEndTimeOptions,
  toMoment,
  hasNoAvailableTimeBlocks,
  sortApps
} from '../utils/helpers';

class RequestForm extends React.Component {

  static propTypes = {
    calendar: PropTypes.object.isRequired,
    myAppointments: PropTypes.array.isRequired,
    addDayBlocksToCalendar: PropTypes.func.isRequired,
    addAppointmentToMyAppointments: PropTypes.func.isRequired
  }

  state = {
    appDate: '',
    startTime: '0',
    endTime: '0',
    earliestDate: '',
    showSummary: false,
    showConfirmation: false,
    timeBlocks: {},
    myAppointments: []
  }

  componentDidMount () {
    const calendar = getCalendarFromLocalStorage() || {};
    const myAppointments = getMyAppointmentsFromLocalStorage();
    const now = moment();
    const earliestDate = now.format('YYYY-MM-DD');
    const timeBlocks = calendar[earliestDate] || createTimeBlocks(now);

    this.setState({
      appDate: earliestDate,
      earliestDate,
      timeBlocks,
      myAppointments: myAppointments || [],
      showSummary: false,
      showConfirmation: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      showSummary: true
    });
  }

  submitRequest = () => {
    const { appDate, timeBlocks, myAppointments, startTime, endTime } = this.state;
    const { addDayBlocksToCalendar, addAppointmentToMyAppointments } = this.props;
    const newTimeBlocks = {};
    const newAppointment = {
      appDate,
      startTime,
      endTime
    };

    for (let key in timeBlocks) {
      newTimeBlocks[key] = timeBlocks[key] === REQUEST_STATUS.REQUESTING
        ? REQUEST_STATUS.SUBMITTED
        : timeBlocks[key];
    }

    this.setState({
      startTime: '0',
      endTime: '0',
      timeBlocks: newTimeBlocks,
      showSummary: false,
      showConfirmation: true,
      myAppointments: [ ...myAppointments, newAppointment ]
    }, () => {
      addAppointmentToMyAppointments(newAppointment);
      addDayBlocksToCalendar({
        appDate,
        newTimeBlocks
      });
    });
  }

  cancelRequest = () => {
    this.setState({
      showSummary: false,
      startTime: '0',
      endTime: '0'
    }, this._resetBlocks);
  }

  handleChangeDate = (e) => {
    const { calendar, addDayBlocksToCalendar } = this.props;
    const newAppDate = moment(e.target.value, 'YYYY-MM-DD');

    this.setState({
      startTime: '0',
      endTime: '0',
      appDate: e.target.value,
      timeBlocks: calendar[e.target.value] || createTimeBlocks(newAppDate)
    }, () => {
      const { appDate, timeBlocks } = this.state;
      addDayBlocksToCalendar({ appDate, timeBlocks });
    });
  }

  altHandleChangeDate = (newAppDate) => {
    const { calendar, addDayBlocksToCalendar } = this.props;
    const newAppMoment = moment(newAppDate, 'YYYY-MM-DD');

    this.setState({
      startTime: '0',
      endTime: '0',
      appDate: newAppDate,
      timeBlocks: calendar[newAppDate] || createTimeBlocks(newAppMoment)
    }, () => {
      const { appDate, timeBlocks } = this.state;
      addDayBlocksToCalendar({ appDate, timeBlocks });
    });
  }

  handleChangeStartTime = (e) => {
    const { timeBlocks: newTimeBlocks } = this.state;
    const { addDayBlocksToCalendar } = this.props;

    for (let propKey in newTimeBlocks) {
      if (newTimeBlocks[propKey] === REQUEST_STATUS.REQUESTING) {
        newTimeBlocks[propKey] = REQUEST_STATUS.AVAILABLE;
      }
    }

    newTimeBlocks[e.target.value] = REQUEST_STATUS.REQUESTING;

    this.setState({
      startTime: e.target.value,
      endTime: '0',
      timeBlocks: newTimeBlocks
    }, () => {
      const { appDate, timeBlocks } = this.state;
      addDayBlocksToCalendar({ timeBlocks });
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

  toStartAppRequest = () => {
    this.setState({
      showSummary: false,
      showConfirmation: false
    });
  }

  isReady = () => {
    const { appDate, startTime, endTime } = this.state;
    if (appDate === '') return false;
    if (startTime == 0 || startTime === '0' || !startTime) return false;
    if (endTime == 0 || endTime === '0' || !endTime) return false;

    return true;
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

  render () {
    const {
      appDate,
      startTime,
      endTime,
      earliestDate,
      timeBlocks,
      showSummary,
      showConfirmation,
      myAppointments
    } = this.state;
    const nonAvailable = hasNoAvailableTimeBlocks(timeBlocks);

    return (
      <main>
        <form className='form column wrap margin-top-lg' onSubmit={(this.handleSubmit)}>
          <div className='row'>
            <div className='column padding-top-md input-container'>
              { showConfirmation && (
                <Confirmation
                  appDate={appDate}
                  startTime={startTime}
                  toStartAppRequest={this.toStartAppRequest}
                />
              )}
              { showSummary && (
                <RequestSummary
                  appDate={appDate}
                  startTime={startTime}
                  endTime={endTime}
                  submitRequest={this.submitRequest}
                  cancelRequest={this.cancelRequest}
                />
              )}
              { !showSummary && !showConfirmation && (
                <div className='column request'>
                  <div className='row'>
                    <label htmlFor='appDate' className='label'>
                      Date
                    </label>
                  </div>
                  <div className='row'>
                    <DateInput
                      appDate={appDate}
                      earliestDate={earliestDate}
                      handleChangeDate={this.handleChangeDate}
                      altHandleChangeDate={this.altHandleChangeDate}
                    />
                  </div>
                  {nonAvailable
                    ? (
                        <div className='message'>
                          {NO_AVAILABILITY_MESSAGE}
                        </div>
                      )
                    : (
                        <TimeInputSet
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
              )}
              <div className='row'>
                {myAppointments.length > 0 && myAppointments.sort(sortApps).slice(0, 1).map((app, idx) => (
                  <AppointmentCard
                    key={`${app.appDate}${app.startTime}`}
                    {...app}
                    title='Upcoming appointment requests'
                  />
                ))}
              </div>
            </div>
            <div className='row margin-left-med'>
              <div className='column'>
                <div className='text-md text-center margin-sm date'>
                  {toMoment(appDate, startTime).format('dddd, MMM Do, YYYY')}
                </div>
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
      </main>
    );
  }
}

export default withAppointments(RequestForm);
