import moment from 'moment';
import {
  APPOINTMENT_INCREMENTS,
  FIRST_HOUR,
  LAST_HOUR,
  TOTAL_HOURS_IN_A_DAY,
  MINUTES_IN_AN_HOUR,
  REQUEST_STATUS
} from './constants';


function hasOverlap (newApp, currApps) {
  const overlaps = currApps.filter();
}

function overlapping (appA, appB) {
  console.log();
}

export function isAfterNow(timeBlockA, day) {

  const timeA = moment(`${day} ${timeBlockA}`, 'YYYY-MM-DD h:mma');
  const timeNow = moment();


  return timeA.isAfter(timeNow);
}

export function toFriendlyHours (hour, minutes) {
  return moment(`${hour}:${minutes}`, 'HH:mm').format('h:mma');
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

export function getStartTimeOptions (timeBlocks, day) {
  return Object.entries(timeBlocks).filter(([block, status]) => (
      status === REQUEST_STATUS.AVAILABLE && isAfterNow(block, day)
    ));
}


