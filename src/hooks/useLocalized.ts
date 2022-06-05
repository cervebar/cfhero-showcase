import { useMemo } from 'react';

import { getLocalizedMedicines } from '../constants/medicinesLib';
import { getLocalizedFlutters } from '../data/fluttersData';
import { getLocalizedInhalators } from '../data/inhalatorsData';

export function useLocalizedInhalators() {
  return useMemo(getLocalizedInhalators, []);
}

export function useLocalizedFlutters() {
  return useMemo(getLocalizedFlutters, []);
}

export function useLocalizedMedicines() {
  return useMemo(getLocalizedMedicines, []);
}
