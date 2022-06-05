import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { importAndroidUserData, shiftStateCheat } from '../actions/application';
import { dbMigration2to3 } from '../actions/dbMigration';
import {
  addCompletedFluttering,
  setFlutteringPatternIndex,
  setFlutteringPdvVisited,
  setTemporaryFlutteringPatternIndex,
} from '../actions/fluttering';
import { RootActions } from '../actions/rootActions';
import { DEFAULT_FLUTTERING_PATTERN_INDEX } from '../containers/inhalation/constants';
import { DailyFlutteringsT, FlutteringStateT } from '../types/fluttering';
import { isSuccessful } from '../types/session';
import fixStateArray from '../utils/fixStateArray';
import { getTodayFlutterings } from '../utils/fluttering';
import { DAY, addDayToDate, getNormalizedDayTimestamp } from '../utils/time';
import { migrateFlutterings2To3 } from './dbmigrations/fluttering';

const initialState: FlutteringStateT = {
  dailyFlutterings: [],
  currentPatternIndex: DEFAULT_FLUTTERING_PATTERN_INDEX,
  temporaryPatternIndex: DEFAULT_FLUTTERING_PATTERN_INDEX,
  totalSuccessfulFlutteringsCount: 0,
  pdvVisited: false,
};

const flutteringReducer: Reducer<FlutteringStateT, RootActions> = (
  state: FlutteringStateT = initialState,
  action: RootActions,
): FlutteringStateT => {
  switch (action.type) {
    case getType(addCompletedFluttering): {
      const fluttering = action.payload;
      const { dailyFlutterings } = state;
      const [todayFlutterings, index] = getTodayFlutterings(dailyFlutterings);
      return {
        ...state,
        totalSuccessfulFlutteringsCount:
          state.totalSuccessfulFlutteringsCount + (isSuccessful(fluttering) ? 1 : 0),
        dailyFlutterings: fixStateArray(dailyFlutterings, index, () =>
          todayFlutterings
            ? {
                ...todayFlutterings,
                flutterings: [...todayFlutterings.flutterings, fluttering],
              }
            : {
                flutterings: [fluttering],
                date: getNormalizedDayTimestamp(),
              },
        ),
      };
    }

    case getType(setFlutteringPatternIndex):
      return { ...state, currentPatternIndex: action.payload };

    case getType(setTemporaryFlutteringPatternIndex):
      return { ...state, temporaryPatternIndex: action.payload };

    case getType(setFlutteringPdvVisited):
      return { ...state, pdvVisited: action.payload };

    case getType(shiftStateCheat): {
      const { dailyFlutterings } = state;
      return {
        ...state,
        dailyFlutterings: dailyFlutterings.map(({ date, flutterings, ...dailyFluttering }) => ({
          ...dailyFluttering,
          date: date - DAY,
          flutterings: flutterings.map(item => ({
            ...item,
            created: item.created - DAY,
          })),
        })),
      };
    }

    case getType(dbMigration2to3): {
      return migrateFlutterings2To3(state);
    }

    case getType(importAndroidUserData):
      const {
        payload: { fluttering },
      } = action;
      const dailyFlutterings = ((fluttering?.dailyFlutterings as DailyFlutteringsT[]) ?? [])
        .map(dailyFluttering => ({
          ...dailyFluttering,
          date: getNormalizedDayTimestamp(addDayToDate(dailyFluttering.date)),
        }))
        // Sorting so that the oldest entry is first in the array
        .sort((a, b) => (a.date < b.date ? -1 : 1));
      const flutteringState: FlutteringStateT = {
        ...fluttering,
        dailyFlutterings,
      };
      return flutteringState;
  }

  return state;
};

export default flutteringReducer;
