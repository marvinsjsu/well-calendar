const KEY_CALENDAR = 'CALENDAR';
const KEY_MY_APPOINTMENTS = 'MY_APPOINTMENTS';

export const setCalendarInLocalStorage = (calendar) => {
console.log('calendar', calendar);

  localStorage.setItem(KEY_CALENDAR, JSON.stringify(calendar));
};

export const getCalendarFromLocalStorage = () => {
  let calendar = localStorage.getItem(KEY_CALENDAR);

  if (calendar) {
    calendar = JSON.parse(calendar);
  }

console.log('calendar', calendar);
  return calendar;
};

export const setMyAppointmentsInLocalStorage = (myAppointments) => {
console.log('myAppointments', myAppointments);

  localStorage.setItem(KEY_MY_APPOINTMENTS, JSON.stringify(myAppointments));
};

export const getMyAppointmentsFromLocalStorage = () => {
  let myAppointments = localStorage.getItem(KEY_MY_APPOINTMENTS);

  if (myAppointments) {
    myAppointments = JSON.parse(myAppointments);
  }

console.log('myAppointments', myAppointments);
  return myAppointments;
};