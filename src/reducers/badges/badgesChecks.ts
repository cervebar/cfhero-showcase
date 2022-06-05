import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import {
  addMorningLarkCount,
  addNightOwlCount,
  getBackFromShopCategory,
  habitMasterCounterChange,
} from '../../actions/badgeChecks';
import { addCompletedInhalation } from '../../actions/inhalation';
import { RootActions } from '../../actions/rootActions';
import { amendStreak } from '../../actions/streak';
import { Avatar } from '../../types/avatar';
import { BadgesChecksT } from '../../types/badgesChecks';
import { getNormalizedDayTimestamp } from '../../utils/time';

const initialState: BadgesChecksT = {
  habitMaster: { lastDay: getNormalizedDayTimestamp(), counter: 1 },
  stayer: {
    lastDayChecked: 0,
    counter: 0,
  },
  morningLark: { counter: 0 },
  nightOwl: { counter: 0 },
  buyToutCount: { counter: 0 },
  pedant: {
    counter: 0,
  },
  chameleon: {
    counter: 0,
    lastAvatarItemsState: {
      head: '',
      upperbody: '',
      legs: '',
      hat: '',
      face: '',
    },
  },
};

const getPedantProgress = (
  inhalationDuration: number,
  state: BadgesChecksT,
): BadgesChecksT['pedant'] => {
  const TWENTY_MINUTES = 20 * 60;

  if (inhalationDuration >= TWENTY_MINUTES) {
    return {
      counter: state.pedant.counter + 1,
    };
  }
  return { counter: 0 };
};

const getStayerProgress = (state: BadgesChecksT): BadgesChecksT['stayer'] => {
  const todaySimpleDate = getNormalizedDayTimestamp();
  if (getNormalizedDayTimestamp(state.stayer.lastDayChecked) === todaySimpleDate) {
    //no change today already checked and updated from previous inhalation
    return { ...state.stayer };
  }
  // this is first inhalation of this day, increment counter with days with inhalation
  return {
    lastDayChecked: todaySimpleDate,
    counter: state.stayer.counter + 1,
  };
};

const isAvatarStateChanged = (oldState: Avatar, newState: Avatar): boolean => {
  return (
    oldState.face !== newState.face ||
    oldState.hat !== newState.hat ||
    oldState.legs !== newState.legs ||
    oldState.upperbody !== newState.upperbody ||
    oldState.head !== newState.head
  );
};

export const badgesChecksReducer: Reducer<BadgesChecksT, RootActions> = (
  state = initialState,
  action,
): BadgesChecksT => {
  switch (action.type) {
    case getType(habitMasterCounterChange): {
      return {
        ...state,
        habitMaster: action.payload,
      };
    }
    case getType(addCompletedInhalation):
      const pedantStateSliceProgress = getPedantProgress(action.payload.duration, state);
      const slayerStateSliceProgress = getStayerProgress(state);

      return { ...state, stayer: slayerStateSliceProgress, pedant: pedantStateSliceProgress };
    case getType(addMorningLarkCount): {
      return {
        ...state,
        morningLark: { counter: state.morningLark.counter + 1 },
      };
    }
    case getType(addNightOwlCount): {
      return {
        ...state,
        nightOwl: { counter: state.nightOwl.counter + 1 },
      };
    }
    case getType(amendStreak): {
      return {
        ...state,
        buyToutCount: { counter: state.buyToutCount.counter + 1 },
      };
    }
    case getType(getBackFromShopCategory): {
      if (isAvatarStateChanged(state.chameleon.lastAvatarItemsState, action.payload)) {
        return {
          ...state,
          chameleon: {
            counter: state.chameleon.counter + 1,
            lastAvatarItemsState: action.payload,
          },
        };
      } else {
        //no items change -> keep as is
        return { ...state };
      }
    }
    default:
      return state;
  }
};
