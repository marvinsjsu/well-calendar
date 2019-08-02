import moment from 'moment';
import {
  APPOINTMENT_INCREMENTS,
  FIRST_HOUR,
  LAST_HOUR,
  TOTAL_HOURS_IN_A_DAY,
  MINUTES_IN_AN_HOUR,
  REQUEST_STATUS
} from './constants';

export function toMoment (day, time, strict = false) {
  return moment(`${day} ${time}`, 'YYYY-MM-DD h:mma', strict);
}

export function getFullDateDisplay (appDate, startTime) {
  return toMoment(appDate, startTime, true).isValid()
    && toMoment(appDate, startTime).format('dddd, MMM Do, YYYY')
    || moment().format('dddd, MMM Do, YYYY')
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

export function hasNoAvailableTimeBlocks (timeBlocks) {
  const availableBlocks = Object.entries(timeBlocks).filter(([block, status]) => (
      status === REQUEST_STATUS.AVAILABLE || status === REQUEST_STATUS.REQUESTING
    ));

  return availableBlocks.length === 0;
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
  const endTimeOptions = [];

  for (let block in timeBlocks) {
    if (isAfter(block, startTime, day)) {
      if (timeBlocks[block] === REQUEST_STATUS.AVAILABLE
        || timeBlocks[block] === REQUEST_STATUS.REQUESTING
      ) {
        endTimeOptions.push([ block, timeBlocks[block]]);
      } else {
        endTimeOptions.push([ block, timeBlocks[block]]);
        break;
      }
    }
  }

  if (endTimeOptions.length === 0) {
    const rightAfterStart = toMoment(day, startTime).add('30', 'minutes');
    endTimeOptions.push([rightAfterStart.format('h:mma'), REQUEST_STATUS.AVAILABLE]);
  } else {
    const lastBlock = endTimeOptions[endTimeOptions.length - 1];
    const lastMoment = toMoment(day, lastBlock[0]);

    if (lastMoment.format('h:mma') === '4:30pm'
      && (lastBlock[1] === REQUEST_STATUS.AVAILABLE || lastBlock[1] === REQUEST_STATUS.REQUESTING)
    ) {
      lastMoment.add('30', 'minutes');
      endTimeOptions.push([lastMoment.format('h:mma'), REQUEST_STATUS.AVAILABLE])
    }
  }
  return endTimeOptions;
}

export function sortApps (appA, appB) {
  const timeA = toMoment(appA.appDate, appA.startTime);
  const timeB = toMoment(appB.appDate, appA.startTime);

  return timeA - timeB;
}

export function getMonths () {
  return moment.monthsShort();
}

export function getYears () {
  let years = [];
  let year = moment().year();

  for (let i = 0; i < 100; i++) {
    years = [...years, year];
    year++;
  }

  return years;
}

export function getDays (year, month) {
  const daysInMonth =  moment(`${year}-${month}`, 'YYYY-MMM').daysInMonth();

  return [...Array(daysInMonth + 1).keys()].slice(1);
}

export function getAppDate(year, month, day) {
  return moment(`${month} ${day} ${year}`, 'MMM D YYYY').format('YYYY-MM-DD');
}

export function getTodayObject() {
  const now = moment();
  return {
    year: now.format('YYYY'),
    month: now.format('MMM'),
    day: now.format('D')
  }
}
