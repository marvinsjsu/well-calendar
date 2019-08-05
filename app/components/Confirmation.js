import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { toMoment } from '../utils/helpers';
import { ConnectionConsumer } from '../contexts/connection';
import { ROUTES, LANGUAGE } from '../utils/constants';

export default function Confirmation ({ appDate, startTime, toStartAppRequest }) {
  const appointmentDate = toMoment(appDate, startTime).format('dddd, MMM. Do, YYYY');

  return (
    <ConnectionConsumer>
      {({ connected }) => (
        <React.Fragment>
          <h4 className='message'>
            {LANGUAGE.REQUEST_TITLE.REQUEST_CONFIRMATION(appointmentDate)}
          </h4>
          <div className='flex-row u-margin-top-small'>
            <button
              className='btn'
              onClick={toStartAppRequest}
            >
              Make another request
            </button>
            {connected && (
              <Link
                className='link'
                to={ROUTES.MY_APPOINTMENTS}
              >
                See all requests
              </Link>
            )}
          </div>
        </React.Fragment>
      )}
    </ConnectionConsumer>
  );
}

Confirmation.propTypes = {
  appDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  toStartAppRequest: PropTypes.func.isRequired
};