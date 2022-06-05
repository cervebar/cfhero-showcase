import { Timestamp } from '../types/time';

export const isTimestampToday = (date: Timestamp | undefined | null): boolean => {
  if (typeof date === 'undefined' || typeof date === 'object') return false;
  return (
    getDaysBetweenTimestamps(getNormalizedDayTimestamp(date), getNormalizedDayTimestamp()) === 0
  );
};

export const isTimestampYesterday = (date: Timestamp | undefined | null): boolean => {
  if (typeof date === 'undefined' || typeof date === 'object') return false;
  return (
    getDaysBetweenTimestamps(getNormalizedDayTimestamp(date), getNormalizedDayTimestamp()) === 1
  );
};

export const formatTime = (time: number): string => {
  const seconds = time % 60;
  const secondsResult = seconds < 10 ? `0${seconds}` : seconds;
  const minutes = Math.floor(time / 60);
  const minutesResult = minutes < 10 ? `0${minutes}` : minutes;

  return `${minutesResult}:${secondsResult}`;
};

export const getDateOfHour = (hour: number, date?: Timestamp): Date => {
  let newDate = date ? new Date(date) : new Date(Date.now());
  newDate.setHours(hour, 0, 0, 0);
  return newDate;
};

export const getMillisecondsFromSeconds = (value: number): Timestamp => value * 1000;

export const getTimestamp = (date?: Date): Timestamp => {
  return (date ?? new Date()).getTime();
};

/**
 * Gets normalized date timestamp. Normalized means 12:00 of the date UTC.
 */
export const getNormalizedDayTimestamp = (date?: Date | Timestamp): Timestamp => {
  if (!date && typeof date !== 'number') date = new Date();
  if (typeof (date as any) === 'string') date = new Date(date);
  if (typeof date === 'number') date = new Date(date);
  date.setUTCHours(12, 0, 0, 0);
  return getTimestamp(date);
};

export const DAY = 24 * 60 * 60 * 1000;

/**
 * Find a number of days between two JS timestamps. The difference is calculated in UTC.
 * @param a
 * @param b
 */
export const getDaysBetweenTimestamps = (a: Timestamp, b: Timestamp): Timestamp =>
  /** Yes, there is Math.round(). One would not believe that UTC day has 86 400 seconds +-1. The one is a leap second. **/
  /** According to Wiki (https://en.wikipedia.org/wiki/Unix_time), a leap second occurs approx. once a year and half. **/
  Math.round(Math.abs(a - b) / DAY);

export const addDayToDate = (date: Timestamp, negative = false): Timestamp =>
  getNormalizedDayTimestamp(date + DAY * (negative ? -1 : 1));
