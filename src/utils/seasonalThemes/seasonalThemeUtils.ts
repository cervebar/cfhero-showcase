import { isWithinInterval } from 'date-fns';

import { seasonalThemesLib } from '../../constants/seasonalThemesLib';
import { SeasonalThemeT } from '../../types/seasonalThemes';
import { parseDate } from '../seasonalDates';

export const NO_SEASON = 'default';
export const getSeasonalThemeMatchId = (): string => {
  const seasonalThemesMappedLibWithDates = seasonalThemesWithCurrentDates();
  for (let i = 0; i < seasonalThemesLib.length; i++) {
    const { dateStart, dateEnd, id } = seasonalThemesMappedLibWithDates[i];
    if (dateStart && dateEnd && fitsInDate(new Date(), dateStart, dateEnd)) {
      return id;
    }
  }
  return NO_SEASON;
};

export const seasonalThemesWithCurrentDates = (): SeasonalThemeT[] => {
  return seasonalThemesLib.map((theme): SeasonalThemeT => {
    const { dateStartFormat, dateEndFormat } = theme;
    // check if seasonal dates are specified (they are undefined for 'default' theme)
    if (dateStartFormat && dateEndFormat) {
      const dateStart = parseDate(dateStartFormat);
      const dateEnd = parseDate(dateEndFormat);
      return {
        ...theme,
        dateStart,
        dateEnd,
      };
    }
    return theme;
  });
};

const fitsIn = (startMonth: Number, endMonth: Number, dateToCheckMonth: Number) => {
  const set = new Set();
  if (startMonth > endMonth) {
    // 12-2
    // @ts-ignore
    for (let i = startMonth; i <= 11; i++) {
      set.add(i);
    }
    for (let i = 0; i <= endMonth; i++) {
      set.add(i);
    }
  } else {
    // 1-2
    for (let i = 1; i <= endMonth; i++) {
      set.add(i);
    }
  }
  return set.has(dateToCheckMonth);
};

export const fitsInDate = (dateToCheck: Date, start: Date, end: Date) => {
  const startMonth = start.getMonth();
  const endMonth = end.getMonth();
  const dateToCheckMonth = dateToCheck.getMonth();
  if (!fitsIn(startMonth, endMonth, dateToCheckMonth)) {
    return false;
  }
  if (startMonth > endMonth) {
    // over year 12-2
    if (dateToCheckMonth <= endMonth) {
      // 1 < 2
      start.setFullYear(dateToCheck.getFullYear() - 1);
    } else {
      // 12 > 2
      end.setFullYear(dateToCheck.getFullYear() + 1);
    }
  } // else they are in the same year

  return isWithinInterval(dateToCheck, { start: start, end: end });
};
