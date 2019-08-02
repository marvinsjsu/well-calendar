import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../components/Loading';
import {
  setCalendarInLocalStorage,
  getCalendarFromLocalStorage,
  setMyAppointmentsInLocalStorage,
  getMyAppointmentsFromLocalStorage
} from '../utils/localStorage';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  state = {
    calendar: null,
    myAppointments: null,
    loadingFromLocalStorage: true,

    addDayBlocksToCalendar: ({ appDate, newTimeBlocks }) => {
      this.setState(({ calendar }) => {
        calendar[appDate] = newTimeBlocks;
        console.log('addDayBlocksToCalendar appDate:', appDate);
        console.log('addDayBlocksToCalendar newTimeBlocks:', newTimeBlocks);
        console.log('addDayBlocksToCalendar calendar:', calendar);
        return { calendar };
      }, () => setCalendarInLocalStorage(this.state.calendar));
    },

    addToMyAppointments: (appointment) => {
      this.setState(({ myAppointments }) => ({
        myAppointments: [...myAppointments, appointment]
      }), () => setMyAppointmentsInLocalStorage(this.state.myAppointments));
    }
  }

  componentDidMount () {
    const calendar = getCalendarFromLocalStorage() || {};
    const myAppointments = getMyAppointmentsFromLocalStorage() || [];

    this.setState({
      calendar,
      myAppointments,
      loadingFromLocalStorage: false
    });
  }

  render () {
    const { loadingFromLocalStorage } = this.state;
    const { children } = this.props;

    if (loadingFromLocalStorage){
      return (
        <Loading />
      );
    }

    return (
      <AppContext.Provider value={this.state}>
        {children}
      </AppContext.Provider>
    );
  }
}
