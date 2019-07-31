import React from 'react';
import { AppointmentsConsumer } from '../contexts/appointments';

export default function withAppointments (Component) {
  return class WithAppointments extends React.Component {
    render () {
      return (
        <AppointmentsConsumer>
          {({ appointments, addAppointment }) => (
            <Component
              appointments={appointments}
              addAppointment={addAppointment}
              {...this.props}
            />
          )}
        </AppointmentsConsumer>
      );
    }
  }
}