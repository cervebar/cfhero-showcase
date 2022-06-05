import { MEDICINE_DEFAULT_AMOUNT, getLocalizedMedicines } from '../constants/medicinesLib';
import { RootStateType } from '../reducers/rootReducers';
import { MedicineLibItemT } from '../types/medicine';

export const getCurrentMedicine = (state: RootStateType): MedicineLibItemT | undefined => {
  const { currentMedicine } = state.medicine;
  return currentMedicine ? getLocalizedMedicines()[currentMedicine] : undefined;
};

export const getMedicineById = (id: string | null): MedicineLibItemT | undefined => {
  if (!id) return undefined;
  return getLocalizedMedicines()[id];
};

export const getMedicineAmount = (state: RootStateType): number => {
  const currentMedicine = state.medicine.currentMedicine;
  const medicineAmount =
    currentMedicine && state.medicine.medicineAmountPerMedicine[currentMedicine];
  return typeof medicineAmount === 'number' ? medicineAmount : MEDICINE_DEFAULT_AMOUNT;
};
