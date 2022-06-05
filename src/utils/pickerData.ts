import { TFunction } from 'i18next';

export const DAY_DEFAULT = 10;
export const MONTH_DEFAULT = 6;
export const YEAR_DEFAULT = 2005;

type DatePickerValuesT = {
  value: number;
  title: string;
};

type getPickerDaysT = (value: number) => DatePickerValuesT[];
export const getPickerDays: getPickerDaysT = (month = 1) => {
  const daysInMonths: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const numberOfDays = daysInMonths[month - 1];
  const days = [...new Array(numberOfDays)].map((_, i) => ({ value: i + 1, title: `${i + 1}` }));

  return days;
};

type getPickerMonthsT = (t: TFunction) => DatePickerValuesT[];
export const getPickerMonths: getPickerMonthsT = t => [
  { value: 1, title: t('shared:months.january') },
  { value: 2, title: t('shared:months.february') },
  { value: 3, title: t('shared:months.march') },
  { value: 4, title: t('shared:months.april') },
  { value: 5, title: t('shared:months.may') },
  { value: 6, title: t('shared:months.june') },
  { value: 7, title: t('shared:months.july') },
  { value: 8, title: t('shared:months.august') },
  { value: 9, title: t('shared:months.september') },
  { value: 10, title: t('shared:months.october') },
  { value: 11, title: t('shared:months.november') },
  { value: 12, title: t('shared:months.december') },
];

type getPickerYearsT = () => DatePickerValuesT[];
export const getPickerYears: getPickerYearsT = () => {
  const startingYear = 1950;
  const currentYear = new Date().getFullYear();
  const differenceInYears = currentYear - startingYear + 1;
  const emptyYearsArray = [...new Array(differenceInYears)];

  const years = emptyYearsArray.map((_, i) => {
    const year = startingYear + i;
    return {
      value: year,
      title: `${year}`,
    };
  });

  return years;
};
