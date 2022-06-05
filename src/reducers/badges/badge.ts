import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { importAndroidUserData } from '../../actions/application';
import { hideModal, receiveBadge } from '../../actions/badge';
import { dbMigration0to1, dbMigration1to2, dbMigration2to3 } from '../../actions/dbMigration';
import { RootActions } from '../../actions/rootActions';
import { BadgeInfoT, BadgeReceivedT, BadgeStateT } from '../../types/badge';
import {
  handleMigrateBadgesFromVerion0To1,
  handleMigrateBadgesFromVersion1To2,
  handleMigrateBadgesFromVersion2To3,
} from '../dbmigrations/badge';

export const badgeInitialState: BadgeStateT = {
  available: [
    'b1',
    'b2',
    'b3',
    'b4',
    'b5',
    'b6',
    'b7',
    'b8',
    'b9',
    'b10',
    'b11',
    'b12',
    'b13',
    'b14',
    'b15',
    'b16',
    'b17',
    'b18',
    'b19',
    'b25',
    'b26',
    'b27',
    'b32',
  ],
  owned: [],
  badgeLevels: {},
  achievedBadges: [],
  toDisplayQueue: [],
};

const handleRecieveBadge = (state: BadgeStateT, badgeRecieved: BadgeReceivedT) => {
  const { id, keyInLib, level, removeFromAvailable } = badgeRecieved;
  let nextAvailable = state.available;
  let nextAchievedBadges = [...state.achievedBadges];
  let nextBadgeLevels = { ...state.badgeLevels };

  let nextToDisplayQueue: BadgeInfoT[] = [...state.toDisplayQueue];
  if (removeFromAvailable) {
    // all badge levels completed - remove from available
    nextAvailable = nextAvailable.filter(b => b !== keyInLib);
  }
  const badgeAlreadyAchieved = nextAchievedBadges.some(badge => badge.id === id);
  if (!badgeAlreadyAchieved) {
    nextBadgeLevels = { ...state.badgeLevels, [keyInLib]: level };
    const badgeInfo = { id: id, keyInLib: keyInLib, level: level, achievedDateMillis: Date.now() };
    nextAchievedBadges = [...state.achievedBadges, badgeInfo];
    nextToDisplayQueue = [...state.toDisplayQueue, badgeInfo];
  }

  return {
    ...state,
    available: nextAvailable,
    badgeLevels: nextBadgeLevels,
    achievedBadges: nextAchievedBadges,
    toDisplayQueue: nextToDisplayQueue,
  };
};

const badgeReducer: Reducer<BadgeStateT, RootActions> = (
  state = badgeInitialState,
  action,
): BadgeStateT => {
  switch (action.type) {
    case getType(receiveBadge): {
      return handleRecieveBadge(state, action.payload);
    }
    case getType(hideModal): {
      const [, ...receivedNext] = state.toDisplayQueue;
      return {
        ...state,
        toDisplayQueue: receivedNext,
      };
    }
    case getType(dbMigration0to1): {
      return handleMigrateBadgesFromVerion0To1(state, action.payload.badges0to1);
    }
    case getType(dbMigration1to2): {
      return handleMigrateBadgesFromVersion1To2(state);
    }
    case getType(dbMigration2to3): {
      return handleMigrateBadgesFromVersion2To3(state);
    }
    case getType(importAndroidUserData):
      return action.payload.badge;
    default:
      return state;
  }
};

export default badgeReducer;
