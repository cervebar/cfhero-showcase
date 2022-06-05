import getStringEnums from '../utils/getStringEnums';
import { Localizations } from '../utils/localization/constants';

const MeasurementUnitsList = getStringEnums(['ml', 'package']);
export type MeasurementUnitsT = keyof typeof MeasurementUnitsList;

export type MedicineLibT = Record<string, MedicineLibItemT>;

export type MedicineLibItemT = {
  id: string;
  analyticsId: string;
  measurementUnit: MeasurementUnitsT;
  fluttering: boolean;
  flutteringDelayMs?: number[]; // fluttering delay in milliseconds
  localization: Localizations[];
};

export type CurrentMedicineT = string | null;

export type MedicineAmountPerMedicineT = {
  [key: string]: number;
};

export type MedicineStateT = {
  medicines: string[];
  usedMedicines: string[];
  currentMedicine: CurrentMedicineT;
  medicineAmountPerMedicine: MedicineAmountPerMedicineT;
};
