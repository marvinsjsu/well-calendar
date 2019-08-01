import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import RequestForm from './components/RequestForm';
import { AppointmentsProvider } from './contexts/appointments';
import { connected } from './utils/api';
import { ROUTES } from './utils/constants';

import './index.css';

class App extends React.Component {

  state = {
    appointments: {},
    addAppointment: ({ appDate, newTimeBlocks }) => {
      this.setState(({ appointments }) => {
        appointments[appDate] = newTimeBlocks;
        return { appointments };
      });
    },

  }

  componentDidMount () {
    // this.connectionInterval = window.setInterval(() => {
    //   if (!connected()) {
    //     console.log('disconnected');
    //   }
    // }, 3000);
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
