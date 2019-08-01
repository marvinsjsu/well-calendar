import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import RequestForm from './components/RequestForm';
import { AppointmentsProvider } from './contexts/appointments';
import { connected } from './utils/api';
import { ROUTES } from './utils/constants';
import {
  setCalendarInLocalStorage,
  getCalendarFromLocalStorage,
  setMyAppointmentsInLocalStorage,
  getMyAppointmentsFromLocalStorage
} from './utils/localStorage';

import './index.css';

class App extends React.Component {

  state = {
    calendar: {},
    myAppointments: [],

    addDayBlocksToCalendar: ({ appDate, newTimeBlocks }) => {
      this.setState(({ calendar }) => {
        calendar[appDate] = newTimeBlocks;
        return { calendar };
      }, () => setCalendarInLocalStorage(this.state.calendar));
    },

    addAppointmentToMyAppointments: (appointment) => {
      this.setState(({ myAppointments }) => ({
        myAppointments: [...myAppointments, appointment]
      }), () => setMyAppointmentsInLocalStorage(this.state.myAppointments));
    },

  }

  componentDidMount () {
    // this.connectionInterval = window.setInterval(() => {
    //   if (!connected()) {
    //     console.log('disconnected');
    //   }
    // }, 3000);

    const calendar = getCalendarFromLocalStorage();
    const myAppointments = getMyAppointmentsFromLocalStorage();

console.log('componentDidMount APP - calendar', calendar);

    this.setState({
      calendar: calendar || {},
      myAppointments: myAppointments || []
    }, () => console.log(this.state));
  }

  componentWillUnmount () {
    // window.clearInterval(this.connectionInterval);
           // <Route exact path={ROUTES.MY_APPOINTMENTS} component={} />
    //
  }

  render () {
    return (
      <Router>
        <AppointmentsProvider value={this.state}>
          <div className='container'>
            <Switch>
              <Route exact path={ROUTES.HOME} component={Main} />
              <Route exact path={ROUTES.APPOINTMENT_REQUEST} component={RequestForm} />
            </Switch>
          </div>
        </AppointmentsProvider>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
