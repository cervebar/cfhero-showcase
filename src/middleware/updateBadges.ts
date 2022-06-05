import { Middleware } from 'redux';

import { receiveBadge } from '../actions/badge';
import { RootActions } from '../actions/rootActions';
import { badgeActionGroups } from '../constants/badgeActionGroups';
import badgesLib from '../constants/badgesLib';
import { RootStateType } from '../reducers/rootReducers';
import { arrayIntersection } from '../utils/arrayIntersection';

const updateBadges: Middleware<{}, RootStateType> = store => next => (action: RootActions) => {
  const result = next(action);

  const state = store.getState();
  const availableBadges = state.badge.available;

  const group = badgeActionGroups.find(g => g.actionType === action.type);
  if (!group) return result;

  const badgesIdsToTest = arrayIntersection(group.badgeIds, availableBadges);
  badgesIdsToTest.forEach(badgeId => {
    const badgeLibItem = badgesLib[badgeId];
    const initialBadgeLevel = state.badge.badgeLevels[badgeId] || 0;

    const checkBadgeLevel = (badgeLevel: number): void => {
      const { thresholdValue } = badgeLibItem.levels[badgeLevel];
      const testResult = badgeLibItem.achievedTestFn(state, thresholdValue);
      if (testResult) {
        const newBadgeLevel = badgeLevel + 1;
        const removeFromAvailable = newBadgeLevel >= badgeLibItem.levels.length;
        store.dispatch(
          receiveBadge({
            id: badgeLibItem.levels[badgeLevel].analyticsId,
            level: newBadgeLevel,
            keyInLib: badgeId,
            analyticsId: badgeLibItem.levels[badgeLevel].analyticsId,
            removeFromAvailable,
          }),
        );
      }

      // Recursive call for next badgeLevel
      const nextBadgeLevel = badgeLevel + 1;
      if (nextBadgeLevel < badgeLibItem.levels.length) {
        checkBadgeLevel(nextBadgeLevel);
      }
    };
    checkBadgeLevel(initialBadgeLevel);
  });

  return result;
};

export default updateBadges;
