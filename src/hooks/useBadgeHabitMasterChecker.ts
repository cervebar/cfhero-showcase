import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { habitMasterCounterChange } from '../actions/badgeChecks';
import { getNormalizedDayTimestamp, isTimestampToday, isTimestampYesterday } from '../utils/time';
import useMyState from './useMyState';
import useSubscriptionOnAppStateChange from './useSubscriptionOnAppStateChange';
import useSubscriptionOnDateChange from './useSubscriptionOnDateChange';

export function useBadgeHabitMasterChecker() {
  const dispatch = useDispatch();
  const habitMaster = useMyState(state => state.badgesChecks.habitMaster);

  const executeChecker = useCallback(() => {
    const { lastDay, counter } = habitMaster;
    if (isTimestampToday(lastDay)) return;
    if (isTimestampYesterday(lastDay)) {
      dispatch(
        habitMasterCounterChange({
          lastDay: getNormalizedDayTimestamp(),
          counter: counter + 1,
        }),
      );
    } else {
      // reset counter
      dispatch(habitMasterCounterChange({ lastDay: getNormalizedDayTimestamp(), counter: 1 }));
    }
  }, [dispatch, habitMaster]);

  useEffect(() => {
    executeChecker();
  }, [executeChecker]);

  useSubscriptionOnAppStateChange(executeChecker);
  useSubscriptionOnDateChange(executeChecker);
}
