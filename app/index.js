import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import Main from './components/Main';
import RequestForm from './components/RequestForm';
import { AppProvider } from './contexts/AppProvider';
import { connected } from './utils/api';
import { ROUTES } from './utils/constants';

import './index.css';

class App extends React.Component {
  render () {
    return (
      <Router>
        <AppProvider>
          <div className='container'>
            <Nav />
            <Switch>
              <Route exact path={ROUTES.HOME} component={Main} />
              <Route exact path={ROUTES.APPOINTMENT_REQUEST} component={RequestForm} />
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
