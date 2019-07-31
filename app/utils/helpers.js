import moment from 'moment';
import {
  APPOINTMENT_INCREMENTS,
  FIRST_HOUR,
  LAST_HOUR,
  TOTAL_HOURS_IN_A_DAY,
  MINUTES_IN_AN_HOUR,
  REQUEST_STATUS
} from './constants';

export function toMoment(day, time) {
  return moment(`${day} ${time}`, 'YYYY-MM-DD h:mma');
}

export function toFriendlyHours (hour, minutes) {
  return moment(`${hour}:${minutes}`, 'HH:mm').format('h:mma');
}

export function isBefore(timeBlockA, timeBlockB, day) {
  const timeA = toMoment(day, timeBlockA);
  const timeB = toMoment(day, timeBlockB);

  return timeA.isBefore(timeB);
}

export function isAfter(timeBlockA, timeBlockB, day) {
  const timeA = toMoment(day, timeBlockA);
  const timeB = toMoment(day, timeBlockB);

  return timeA.isAfter(timeB);
}

export function isAfterNow(timeBlockA, day) {
  const timeA = toMoment(day, timeBlockA);
  const timeNow = moment();

  return timeA.isAfter(timeNow);
}

export function createTimeBlocks (appDate) {
  const hours = getHours();
  const minutes = getIncrements();

  let  timeBlocks = hours.reduce((acc, hour) => {
    let time = '';
    for (let i = 0; i < minutes.length; i++) {
      time = toFriendlyHours(hour, minutes[i] * APPOINTMENT_INCREMENTS);
      isAfterNow(time, appDate.format('YYYY-MM-DD'))
      acc[time] = !isAfterNow(time, appDate.format('YYYY-MM-DD'))
        ? REQUEST_STATUS.UNAVAILABLE
        : REQUEST_STATUS.AVAILABLE;
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
      (status === REQUEST_STATUS.AVAILABLE || status === REQUEST_STATUS.REQUESTING )
      && isAfterNow(block, day)
    ));
}

export function getEndTimeOptions (startTime, timeBlocks, day) {
  // if timeBlock is after startTime + 30
  // if timeBlock is available
  const endTimeOptions = [];

  for (let block in timeBlocks) {
    if (isAfter(block, startTime, day)) {
      if (timeBlocks[block] === REQUEST_STATUS.AVAILABLE
        || timeBlocks[block] === REQUEST_STATUS.REQUESTING
      ) {
        endTimeOptions.push([ block, timeBlocks[block]]);
      } else {
        break;
      }
    }
  }


  console.log('endTimeOptions', endTimeOptions);
  if (endTimeOptions.length === 0) {
    const rightAfterStart = toMoment(day, startTime).add('30', 'minutes');
    endTimeOptions.push([rightAfterStart.format('h:mma'), REQUEST_STATUS.AVAILABLE]);
  }
  return endTimeOptions;
}

