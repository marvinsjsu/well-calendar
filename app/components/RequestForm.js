import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DayView from './DayView';
import withAppointments from './withAppointments';
import { createAppointmentID } from '../utils/helpers';

class RequestForm extends React.Component {

  state = {
    appDate: '',
    startTime: '',
    endTime: '',
    earliestDate: '',
    earliestTime: ''
  }

  componentDidMount () {
    const now = moment();
    const earliestDate = now.format('YYYY-MM-DD');
    const earliestHour = now.format('HH');


    this.setState({
      appDate: earliestDate,
      earliestDate
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { appDate, startTime, endTime } = this.state;
    const { addAppointment } = this.props;
    // const id = createAppointmentID(appDate, startTime, endTime);

    addAppointment({
      appDate,
      startTime,
      endTime
    });
  }

  handleChange = (key, e) => {

    this.setState({
      [key]: e.target.value
    });
  }

  isReadyToBook = () => {
    const { appDate, startTime, endTime } = this.state;
    return true;
    // return appDate != undefined && startTime != undefined && endTime != undefined;
  }

  render () {
    const { appDate, startTime, endTime, earliestDate } = this.state;

    return (
      <div className='container__page'>
        <form className='form column' onSubmit={(this.handleSubmit)}>
          <div className='row'>
            <label htmlFor='appDate' className='label'>
              Appointment Date
            </label>
          </div>
          <div className='row'>
            <input
              type='date'
              id='appDate'
              className='input-date'
              value={appDate}
              min={earliestDate}
              onChange={(e) => this.handleChange('appDate', e)}
            />
          </div>
          <div className='row'>
            <button
              className='btn btn-submit'
              type='submit'
              disabled={!this.isReadyToBook()}
            >
              Submit
            </button>
          </div>
          <div className='row'>
            <DayView />
          </div>
        </form>
      </div>
    );
  }
}

export default withAppointments(RequestForm);
