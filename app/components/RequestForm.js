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
import withContext from '../contexts/withContext';
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
  sortApps,
  isAfterNow
} from '../utils/helpers';

class RequestForm extends React.Component {

  static propTypes = {
    context: PropTypes.object.isRequired
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
    const { context: { calendar, myAppointments }} = this.props;
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
    }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      showSummary: true
    });
  }

  submitRequest = () => {
    const { appDate, timeBlocks, myAppointments, startTime, endTime } = this.state;
    const { context: { addDayBlocksToCalendar, addToMyAppointments } } = this.props;
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

    addToMyAppointments(newAppointment);
    addDayBlocksToCalendar({
      appDate,
      newTimeBlocks
    });

    this.setState({
      startTime: '0',
      endTime: '0',
      timeBlocks: newTimeBlocks,
      showSummary: false,
      showConfirmation: true,
      myAppointments: [ ...myAppointments, newAppointment ]
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
    const { context: { calendar, addDayBlocksToCalendar } } = this.props;
    const newAppDate = moment(e.target.value, 'YYYY-MM-DD');

    this.setState({
      startTime: '0',
      endTime: '0',
      appDate: e.target.value,
      timeBlocks: calendar[e.target.value] || createTimeBlocks(newAppDate)
    });
  }

  altHandleChangeDate = (newAppDate) => {
    const { context: { calendar, addDayBlocksToCalendar } } = this.props;
    const newAppMoment = moment(newAppDate, 'YYYY-MM-DD');

    this.setState({
      startTime: '0',
      endTime: '0',
      appDate: newAppDate,
      timeBlocks: calendar[newAppDate] || createTimeBlocks(newAppMoment)
    });
  }

  handleChangeStartTime = (e) => {
    const { appDate, timeBlocks: newTimeBlocks } = this.state;
    const { context: { addDayBlocksToCalendar } } = this.props;

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
    const { context: { addAppointment } } = this.props;

    return false;
    // TODO
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
        <form className='form-request-appointment' onSubmit={(this.handleSubmit)}>
          <div className='flex-row form-request-appointment--form background-red'>
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
                <div className='flex-row'>
                  <label htmlFor='appDate' className='label'>
                    Date
                  </label>
                </div>
                <div className='flex-row'>
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
            <div className='flex-row'>
              {myAppointments.length > 0
                && myAppointments
                    .filter(({appDate, startTime}) => isAfterNow(startTime, appDate))
                    .sort(sortApps)
                    .slice(0, 1)
                    .map((app, idx) => (
                <AppointmentCard
                  key={`${app.appDate}${app.startTime}`}
                  {...app}
                  title='Upcoming appointment request'
                />
              ))}
            </div>
          </div>
          <div className='flex-column day-view'>
            <div className='flex-row'>
              <h4 className='heading-tertiary u-center-text'>
                {toMoment(appDate, startTime).format('dddd, MMM. Do, YYYY')}
              </h4>
            </div>
            <DayView
              appDay={appDate}
              timeBlocks={timeBlocks}
              handleTimeBlockClick={this.handleTimeBlockClick}
            />
            <Legend />
          </div>
        </form>
      </main>
    );
  }
}

export default withContext(RequestForm);
