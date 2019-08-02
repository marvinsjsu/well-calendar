import React from 'react';
import PropTypes from 'prop-types';

import { getYears, getMonths, getDays, getAppDate, getTodayObject } from '../utils/helpers';

export default class DateInput extends React.Component {

  state = {
    dateTypeSupported: null,
    year: '',
    month: '',
    day: '',
  }

  componentDidMount () {
    const checkDateType = document.createElement('input');
    checkDateType.type = 'date';
    const { year, day, month } = getTodayObject();

    this.setState({
      dateTypeSupported: checkDateType.type === 'date',
      year,
      day,
      month
    });
  }

  changeDate = (key, e) => {
    this.setState({
      [key]: e.target.value
    }, () => {
      if (key === 'day') {
        const { year, day, month } = this.state;
        const { altHandleChangeDate } = this.props;
        altHandleChangeDate(getAppDate(year, month, day));
      }
    });
  }

  render () {
    const { dateTypeSupported, year, month, day } = this.state;
    const { appDate, earliestDate, handleChangeDate } = this.props;

    return (
      <div className='row'>
        {dateTypeSupported
          ? (
              <input
                type='date'
                id='appDate'
                className='input-date'
                value={appDate}
                min={earliestDate}
                autoComplete='false'
                onChange={handleChangeDate}
              />
            )
          : (
              <React.Fragment>
                <select
                  id='year'
                  className='input-date-year'
                  value={year}
                  onChange={(e) => this.changeDate('year', e)}
                >
                  <option key={0} value={''} disabled>- year -</option>
                  {getYears().map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select
                  id='month'
                  className='input-date-month'
                  value={month}
                  onChange={(e) => this.changeDate('month', e)}
                  disabled={year === ''}
                >
                  <option key={0} value={''} disabled>- month -</option>
                  {getMonths().map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  id='day'
                  className='input-date-day'
                  value={day}
                  onChange={(e) => this.changeDate('day', e)}
                  disabled={year === '' || month === ''}
                >
                  <option key={0} value={''} disabled>- day -</option>
                  {year !== '' && month !== '' && getDays(year, month).map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </React.Fragment>
            )
        }

      </div>

    );
  }
}