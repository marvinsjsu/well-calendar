import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loading from './components/Loading';
import Nav from './components/Nav';
import NoMatch from './components/NoMatch';
import { AppProvider } from './contexts/AppProvider';
import { connected } from './utils/api';
import { ROUTES } from './utils/constants';

import './css/main.css';

const RequestForm = React.lazy(() => import('./components/RequestForm'));
const MyAppointments = React.lazy(() => import('./components/MyAppointments'));

class App extends React.Component {
  render () {
    return (
      <Router>
        <AppProvider>
          <div className='container'>
            <Nav />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path={ROUTES.HOME} component={RequestForm} />
                <Route exact path={ROUTES.MY_APPOINTMENTS} component={MyAppointments} />
                <Route component={NoMatch} />
              </Switch>
            </React.Suspense>
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
