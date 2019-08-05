const KEY_CALENDAR = 'CALENDAR';
const KEY_MY_APPOINTMENTS = 'MY_APPOINTMENTS';

export const setCalendarInLocalStorage = (calendar) => {
  localStorage.setItem(KEY_CALENDAR, JSON.stringify(calendar));
};

export const getCalendarFromLocalStorage = () => {

  let calendar = localStorage.getItem(KEY_CALENDAR);

  if (calendar) {
    calendar = JSON.parse(calendar);
  }

  return calendar;
};

export const setMyAppointmentsInLocalStorage = (myAppointments) => {
  localStorage.setItem(KEY_MY_APPOINTMENTS, JSON.stringify(myAppointments));
};

export const getMyAppointmentsFromLocalStorage = () => {

  let myAppointments = localStorage.getItem(KEY_MY_APPOINTMENTS);

  if (myAppointments) {
    myAppointments = JSON.parse(myAppointments);
  }

  return myAppointments;
};