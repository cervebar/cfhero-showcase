import { Timestamp } from './time';

export type LevelLibItemT = {
  unlockKeysNeeded: number;
  requiresFulfilledDailyPlan: boolean;
};

export type LevelLibT = {
  [key in string]: LevelLibItemT;
};

export type LevelStateT = {
  level: number;
  lastLevelReachedDate: Timestamp;
};

export type LevelInfoT = [number, Timestamp];
