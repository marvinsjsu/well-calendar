import React from 'react';
import { Link } from 'react-router-dom';

import AppointmentCard from './AppointmentCard';
import withContext from '../contexts/withContext';
import { ROUTES } from '../utils/constants';
import { sortApps, isAfterNow } from '../utils/helpers';

function MyAppointments ({ context: { myAppointments } }) {
  const hasAppointments = myAppointments.length > 0;

  return (
    <main>
      <section className='section-my-appointments'>
        <div className='flex-row'>
          { hasAppointments && (
            <h2 className='heading-primary u-center-text'>
              My appointment requests
            </h2>
          )}
        </div>
        <div className='flex-row flex-row--flex-start'>
          { !hasAppointments && (
            <p className='message u-center-text flex-center'>
              You currently don't have any appointment requests.
            </p>
          )}
          { hasAppointments && myAppointments
              .filter(({ appDate, startTime }) => (isAfterNow(startTime, appDate)))
              .sort(sortApps)
              .map((appointment, idx) => (
                <AppointmentCard key={idx} {...appointment} />
            ))
          }
        </div>
      </section>
    </main>
  );
}

MyAppointments.propType = {
  context: PropType.object.isRequired
};

export default withContext(MyAppointments);
