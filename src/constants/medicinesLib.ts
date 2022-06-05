import { MedicineLibItemT, MedicineLibT } from '../types/medicine';
import { Localizations } from '../utils/localization/constants';
import { getSupportedLocale } from '../utils/localization/getSupportedLocale';

const MS_IN_HOUR = 1000 * 60 * 60;
const MS_IN_MINUTE = 1000 * 60;
export const MEDICINE_DEFAULT_AMOUNT = 3.0;

const medicinesLib: MedicineLibItemT[] = [
  {
    // Amilorid
    id: 'm1',
    analyticsId: 'm1',
    measurementUnit: 'ml',
    fluttering: true,
    localization: [Localizations.CS, Localizations.SK, Localizations.DEFAULT],
  },
  {
    // Fyziologický roztok
    id: 'm2',
    analyticsId: 'm2',
    measurementUnit: 'ml',
    fluttering: true,
    localization: [Localizations.CS, Localizations.SK, Localizations.PL, Localizations.DEFAULT],
  },
  {
    // Solny roztok NaCl
    id: 'm3',
    analyticsId: 'm3',
    measurementUnit: 'ml',
    fluttering: true,
    localization: [
      Localizations.CS,
      Localizations.SK,
      Localizations.PL,
      Localizations.UK,
      Localizations.DEFAULT,
    ],
  },
  {
    // ACC Injekt
    id: 'm4',
    analyticsId: 'm4',
    measurementUnit: 'ml',
    fluttering: true,
    localization: [Localizations.CS, Localizations.SK, Localizations.DEFAULT],
  },
  {
    // Vincentka
    id: 'm5',
    analyticsId: 'm5',
    measurementUnit: 'ml',
    fluttering: true,
    localization: [Localizations.CS, Localizations.SK, Localizations.DEFAULT],
  },
  {
    // Mucosolvan
    id: 'm6',
    analyticsId: 'm6',
    measurementUnit: 'ml',
    fluttering: true,
    localization: [
      Localizations.CS,
      Localizations.SK,
      Localizations.PL,
      Localizations.UK,
      Localizations.DEFAULT,
    ],
  },
  {
    // Ambrobene
    id: 'm7',
    analyticsId: 'm7',
    measurementUnit: 'ml',
    fluttering: true,
    localization: [Localizations.CS, Localizations.SK, Localizations.DEFAULT],
  },
  {
    // Pulmozyme
    id: 'm8',
    analyticsId: 'm8',
    measurementUnit: 'ml',
    fluttering: true,
    flutteringDelayMs: [0.5 * MS_IN_HOUR, 1.0 * MS_IN_HOUR, 1.5 * MS_IN_HOUR],
    localization: [Localizations.CS, Localizations.SK, Localizations.UK, Localizations.DEFAULT],
  },
  {
    // Pulmozyme for Poland - different delay
    id: 'm8_pl',
    analyticsId: 'm8', // same medicine different fluttering approach
    measurementUnit: 'ml',
    fluttering: true,
    flutteringDelayMs: [1.5 * MS_IN_HOUR, 2 * MS_IN_HOUR],
    localization: [Localizations.PL],
  },
  {
    // Colomycin/Colistin
    id: 'm9',
    analyticsId: 'm9',
    measurementUnit: 'ml',
    fluttering: false,
    localization: [
      Localizations.CS,
      Localizations.SK,
      Localizations.PL,
      Localizations.UK,
      Localizations.DEFAULT,
    ],
  },
  {
    // TOBI
    id: 'm10',
    analyticsId: 'm10',
    measurementUnit: 'ml',
    fluttering: false,
    localization: [
      Localizations.CS,
      Localizations.SK,
      Localizations.PL,
      Localizations.UK,
      Localizations.DEFAULT,
    ],
  },
  {
    // Bramitob
    id: 'm11',
    analyticsId: 'm11',
    measurementUnit: 'ml',
    fluttering: false,
    localization: [
      Localizations.CS,
      Localizations.SK,
      Localizations.PL,
      Localizations.UK,
      Localizations.DEFAULT,
    ],
  },
  {
    // Berodual
    id: 'm12',
    analyticsId: 'm12',
    measurementUnit: 'ml',
    fluttering: true,
    localization: [Localizations.CS, Localizations.SK, Localizations.UK, Localizations.DEFAULT],
  },
  {
    // Yabro
    id: 'm13',
    analyticsId: 'm13',
    measurementUnit: 'ml',
    fluttering: false,
    localization: [Localizations.CS, Localizations.SK, Localizations.DEFAULT],
  },
  {
    // Fungizone
    id: 'm14',
    analyticsId: 'm14',
    measurementUnit: 'ml',
    fluttering: false,
    localization: [Localizations.CS, Localizations.SK, Localizations.PL, Localizations.DEFAULT],
  },
  {
    id: 'pulmicort',
    analyticsId: 'pulmicort',
    measurementUnit: 'ml',
    fluttering: false,
    localization: [Localizations.PL],
  },
  {
    // This encompasses Berodual and Ventolin (for Poland only)
    id: 'bronchodilators',
    analyticsId: 'bronchodilators',
    measurementUnit: 'ml',
    fluttering: true,
    localization: [Localizations.PL],
    flutteringDelayMs: [15 * MS_IN_MINUTE],
  },
];

export const getLocalizedMedicines = (): MedicineLibT => {
  const locale = getSupportedLocale();
  let localizedMedicines: MedicineLibT = {};
  for (const med of medicinesLib) {
    if (med.localization.some((l: string) => l === locale)) {
      localizedMedicines[med.id] = med;
    }
  }
  return localizedMedicines;
};

export const getAllMedicines = () => {
  return medicinesLib.reduce<MedicineLibT>(
    (allMedicines, medicine) => ({ ...allMedicines, [medicine.id]: medicine }),
    {},
  );
};

export const getAllMedicineIds = () =>
  medicinesLib.reduce<string[]>((ids, { id }) => [...ids, id], []);
