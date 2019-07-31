import moment from 'moment';

export function createAppointmentID (date, startTime, endTime) {
  return `${date}::${startTime}::${endTime}`;
}

export function allAvailableTimes(dayAppointments, increments) {
  const hours = [...Array(24).keys()];
  const minutes = [15, 30, 45];
}

function hasOverlap (newApp, currApps) {
  const overlaps = currApps.filter();
}

function overlapping(appA, appB) {
  console.log();
}

export function convertToHours(hour) {
  if (hour === 0) {
    return `12:00am`;
  }

  if (hour === 12) {
    return `12:00pm`;
  }

  if (hour > 12) {
    return `${hour % 12}:00pm`;
  }

  return `${hour}:00am`
}


export function toFriendlyHours(hour, minutes) {
  let meridium = hour < 12 ? 'am' : 'pm';
  minutes = minutes === 0 ? '00' : minutes;

  if (hour === 0) {
    return `12:${minutes}${meridium}`;
  }

  if (hour > 12) {
    return `${hour % 12}:${minutes}${meridium}`;
  }

  return `${hour}:${minutes}${meridium}`;
}






