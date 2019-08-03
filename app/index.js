import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import MyAppointments from './components/MyAppointments';
import RequestForm from './components/RequestForm';
import { AppProvider } from './contexts/AppProvider';
import { connected } from './utils/api';
import { ROUTES } from './utils/constants';

import './css/main.css';

class App extends React.Component {
  render () {
    return (
      <Router>
        <AppProvider>
          <div className='container'>
            <Nav />
            <Switch>
              <Route exact path={ROUTES.HOME} component={RequestForm} />
              <Route exact path={ROUTES.MY_APPOINTMENTS} component={MyAppointments} />

            </Switch>
          </div>
        </AppProvider>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
