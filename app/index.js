import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RequestForm from './components/RequestForm';
import { AppointmentsProvider } from './contexts/appointments';
import { connected } from './utils/api';

import './index.css';

class App extends React.Component {

  state = {
    appointments: {},
    addAppointment: ({ appDate, newTimeBlocks }) => {
      this.setState(({ appointments }) => {
        appointments[appDate] = newTimeBlocks;
        return { appointments };
      }, () => console.log(this.state));
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
  }

  render () {
    return (
      <Router>
        <AppointmentsProvider value={this.state}>
          <div className='container'>

            <Switch>
              <Route exact path='/' component={RequestForm} />
              <Route exact path='/request' component={RequestForm} />
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
