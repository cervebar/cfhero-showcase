import { parse } from 'date-fns';
/**
 * This util methods prepares the calendar instance regarding the values.
 *
 * date format: 'mm HH dd MM yyyy' or 'mm HH dd MM *' for EVERY_YEAR wildcard
 * example date: '01 01 31 10 *' = every year from 31.10 1:01
 */
export const FORMAT_PATTERN = 'mm HH dd MM';
export const FORMAT_PATTERN_FULL = 'mm HH dd MM yyyy';

export const parseDate = (dateString: string): Date => {
  if (!dateString.includes('*')) {
    // no year wildcard, this is fixed year
    return parse(dateString, FORMAT_PATTERN_FULL, new Date());
  }
  const noAsterixDateString = dateString.replace('*', '');
  return parse(noAsterixDateString, FORMAT_PATTERN, new Date());
};
