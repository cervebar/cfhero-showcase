export const HOUR_DEFAULT = 7;
export const MINUTE_DEFAULT = 0;

export type TimeT = {
  minute: number;
  hour: number;
};

export type HandleSetTimeT = (date: TimeT) => void;

export const minuteValues = Array.from({ length: 60 }, (_, i) => i++); //from 0
export const hourValues = Array.from({ length: 23 }, (_, i) => i + 1); // from 1
