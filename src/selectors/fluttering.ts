import flutteringPatternsLib from '../constants/flutteringPatternsLib';
import { DEFAULT_FLUTTERING_PATTERN_INDEX } from '../containers/inhalation/constants';
import { RootStateType } from '../reducers/rootReducers';
import { DeviceT } from '../types/devices';
import { FlutteringPatternT, FlutteringT } from '../types/fluttering';
import { isSuccessful } from '../types/session';
import getLastArrayItem from '../utils/getLastArrayItem';
import { isTodayInhalationSuccessful } from '../utils/inhalation';
import { getLastInhalation } from './inhalation';
import { getMedicineById } from './medicine';

export const getLastFluttering = (state: RootStateType): FlutteringT | undefined => {
  const last = getLastArrayItem(state.fluttering.dailyFlutterings);
  return getLastArrayItem(last?.flutterings);
};

export const getIsFlutteringRequired = (state: RootStateType): boolean => {
  const lastInhalation = getLastInhalation(state);
  if (!isTodayInhalationSuccessful(lastInhalation)) return false;

  const currentMedicine = getMedicineById(state.medicine.currentMedicine);
  if (!currentMedicine || !currentMedicine.fluttering) return false;

  const lastFluttering = getLastFluttering(state);
  if (!lastFluttering) return true;

  return lastInhalation.created < lastFluttering.created ? !isSuccessful(lastFluttering) : true;
};

export const getFlutteringPattern = (state: RootStateType): FlutteringPatternT => {
  let pattern = flutteringPatternsLib[state.fluttering.currentPatternIndex];
  if (!pattern) {
    console.error('Invalid fluttering pattern index');
    pattern = flutteringPatternsLib[DEFAULT_FLUTTERING_PATTERN_INDEX];
  }
  return pattern;
};

export const getTemporaryFlutteringPattern = (state: RootStateType): FlutteringPatternT => {
  let pattern = flutteringPatternsLib[state.fluttering.temporaryPatternIndex];
  if (!pattern) {
    console.error('Invalid fluttering pattern index');
    pattern = flutteringPatternsLib[DEFAULT_FLUTTERING_PATTERN_INDEX];
  }
  return pattern;
};

export const getCurrentFlutter = (state: RootStateType): DeviceT | undefined => {
  const currentFlutterId = state.flutter.activeId;
  return state.flutter.devices.find((flutter: DeviceT) => flutter.id === currentFlutterId);
};
