import { SEVEN_DAY_MILLIS } from '../../constants/cfheroConstants';
import { BadgeT } from '../../types/badge';

export const getIsNewlyAchieved = (badge: BadgeT) =>
  badge.achievedDateMillis ? Date.now() - badge.achievedDateMillis < SEVEN_DAY_MILLIS : false;
