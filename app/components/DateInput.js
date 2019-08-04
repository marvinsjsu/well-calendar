import React from 'react';
import PropTypes from 'prop-types';

import { getYears, getMonths, getDays, getAppDate, getTodayObject, getMoment } from '../utils/helpers';

export default class DateInput extends React.Component {

  state = {
    dateTypeSupported: null,
    year: '',
    month: '',
    day: '',
  }

  componentDidMount () {
    // detect if input fallsback from type date to text
    const checkDateType = document.createElement('input');
    checkDateType.type = 'date';

    const { appDate } = this.props;
    let { year, day, month } = getTodayObject();

    if (appDate) {
      let appDateMoment = getMoment(appDate);
      year = appDateMoment.format('YYYY');
      day = appDateMoment.format('D');
      month = appDateMoment.format('MMM')
    }

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
      const { year, day, month } = this.state;
      if (year !== '' && day !== '' && month !== '') {
        const { altHandleChangeDate } = this.props;
        altHandleChangeDate(getAppDate(year, month, day));
      }
    });
  }

  render () {
    const { dateTypeSupported, year, month, day } = this.state;
    const { appDate, earliestDate, handleChangeDate } = this.props;

    return (
      <React.Fragment>
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
                    <option key={year} value={year}>&nbsp;{year}</option>
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
                    <option key={month} value={month}>&nbsp;{month}</option>
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
                    <option key={day} value={day}>&nbsp;{day}</option>
                  ))}
                </select>
              </React.Fragment>
            )
        }
      </React.Fragment>
    );
  }
}