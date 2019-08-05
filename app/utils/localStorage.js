const KEY_CALENDAR = 'CALENDAR';
const KEY_MY_APPOINTMENTS = 'MY_APPOINTMENTS';

export const setCalendarInLocalStorage = (calendar) => {
  console.log('setCalendarInLocalStorage calendar: ', calendar);
  // localStorage.clear();
  localStorage.setItem(KEY_CALENDAR, JSON.stringify(calendar));
};

export const getCalendarFromLocalStorage = () => {
  localStorage.clear();

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
  localStorage.clear();

  let myAppointments = localStorage.getItem(KEY_MY_APPOINTMENTS);

  if (myAppointments) {
    myAppointments = JSON.parse(myAppointments);
  }

  return myAppointments;
};