export const APPOINTMENT_INCREMENTS = 30;
export const FIRST_HOUR = 9; // 9am
export const LAST_HOUR = 17; // 5pm
export const TOTAL_HOURS_IN_A_DAY = 24;
export const MINUTES_IN_AN_HOUR = 60;

export const ROUTES = {
  HOME: '/',
  APPOINTMENT_REQUEST: '/request',
  MY_APPOINTMENTS: '/myappointments'
};

export const REQUEST_STATUS = {
  SUBMITTED: 'submitted',
  REQUESTING: 'requesting',
  UNAVAILABLE: 'unavailable',
  AVAILABLE: 'available'
};


export const LANGUAGE = {
  NO_AVAILABILITY_MESSAGE: `
    There are no available appointments for
    this day. Please pick another date.
  `,
  NO_APPOINTMENTS: `
    You currently don't have any appointment requests.
  `,
  REQUEST_TITLE: {
    PICK_DATE: `
      Please choose the date and time for
      your appointment.
    `,
    CONFIRM_SUMMARY: `
      Please confirm your appointment
      request.
    `,
    REQUEST_CONFIRMATION: (appointmentDate) => (`
      Thank you! Your appointment
      request for ${appointmentDate}
      has been submitted.
    `),
  }
};

export const NO_AVAILABILITY_MESSAGE = `
  Sorry, but there are no longer
  any available appointments for
  this day. Please feel free to
  pick another day.
`;


