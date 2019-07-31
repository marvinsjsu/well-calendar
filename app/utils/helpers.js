import moment from 'moment';
import {
  APPOINTMENT_INCREMENTS,
  FIRST_HOUR,
  LAST_HOUR,
  TOTAL_HOURS_IN_A_DAY,
  MINUTES_IN_AN_HOUR,
  REQUEST_STATUS
} from './constants';


function isBefore(timeBlockA, timeBlockB, day) {
  const timeA = moment(`${day} ${timeBlockA}`, 'YYYY-MM-DD h:mma');
  const timeB = moment(`${day} ${timeBlockB}`, 'YYYY-MM-DD h:mma');

  return timeA.isBefore(timeB);
}

export function isAfterNow(timeBlockA, day) {
  const timeA = moment(`${day} ${timeBlockA}`, 'YYYY-MM-DD h:mma');
  const timeNow = moment();

  return timeA.isAfter(timeNow);
}

export function isAfter(timeBlockA, timeBlockB, day) {
  const timeA = moment(`${day} ${timeBlockA}`, 'YYYY-MM-DD h:mma');
  const timeB = moment(`${day} ${timeBlockB}`, 'YYYY-MM-DD h:mma');

  return timeA.isAfter(timeB);
}

export function toFriendlyHours (hour, minutes) {
  return moment(`${hour}:${minutes}`, 'HH:mm').format('h:mma');
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
  const submittedBlocks = Object.entries(timeBlocks).filter(([block, status]) => (
      status === REQUEST_STATUS.SUBMITTED
    ));

  console.log('submittedBlocks', submittedBlocks);

  return Object.entries(timeBlocks).filter(([block, status]) => {
      if (isBefore(block, startTime, day)) return false;
      // if (submittedBlocks.length > 0 && isAfter(block, submittedBlocks[0][0], day)) return false;
      console.log('startTime', startTime);
      console.log('block', block);
      return status === REQUEST_STATUS.AVAILABLE && isAfterNow(block, day)
    });

  // if block is before time start block
  // - block is not good
  // if block is after time start block
  // - block is good if it's before a submitted block
  // - block is not good if it's submitted block
  // - block is not good if it's after submitted block
}

