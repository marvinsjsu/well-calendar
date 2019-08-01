import React from 'react';
import { AppointmentsConsumer } from '../contexts/appointments';

export default function withAppointments (Component) {
  return class WithAppointments extends React.Component {
    render () {
      return (
        <AppointmentsConsumer>
          {({
            calendar,
            myAppointments,
            addDayBlocksToCalendar,
            addAppointmentToMyAppointments
          }) => (
            <Component
              calendar={calendar}
              myAppointments={myAppointments}
              addDayBlocksToCalendar={addDayBlocksToCalendar}
              addAppointmentToMyAppointments={addAppointmentToMyAppointments}
              {...this.props}
            />
          )}
        </AppointmentsConsumer>
      );
    }
  }
}