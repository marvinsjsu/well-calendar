import moment from 'moment';
import {
  APPOINTMENT_INCREMENTS,
  FIRST_HOUR,
  LAST_HOUR,
  TOTAL_HOURS_IN_A_DAY,
  MINUTES_IN_AN_HOUR,
  REQUEST_STATUS
} from './constants';

export function createAppointmentID (date, startTime, endTime) {
  return `${date}::${startTime}::${endTime}`;
}

export function allAvailableTimes (dayAppointments, increments) {
  const hours = [...Array(24).keys()];
  const minutes = [15, 30, 45];
}

function hasOverlap (newApp, currApps) {
  const overlaps = currApps.filter();
}

function overlapping (appA, appB) {
  console.log();
}

export function convertToHours (hour) {
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


export function toFriendlyHours (hour, minutes) {
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

export function createTimeBlocks () {
  const hours = getHours();
  const minutes = getIncrements();

  let  timeBlocks = hours.reduce((acc, hour) => {
    let time = '';
    for (let i = 0; i < minutes.length; i++) {
      time = toFriendlyHours(hour, minutes[i] * APPOINTMENT_INCREMENTS);
      acc[time] = REQUEST_STATUS.AVAILABLE;
    }

    return acc;
  }, {});

  return timeBlocks;
}

export function getHours () {
  return [...Array(TOTAL_HOURS_IN_A_DAY).keys()].slice(FIRST_HOUR, LAST_HOUR);
}

export function getIncrements () {
  return [...Array(MINUTES_IN_AN_HOUR/APPOINTMENT_INCREMENTS).keys()];
}






