import React from 'react';
import { useTranslation } from 'react-i18next';

import { getLevelDescriptor } from '../../business/level/getLevelDescriptor';
import useLevel from '../../business/level/hooks/useLevel';
import { useLastBrokenStreak } from '../../business/streak/hooks/useLastBrokenStreak';
import useLostKeys from '../../business/streak/hooks/useLostKeys';
import useNextLevelKeysToReach from '../../business/streak/hooks/useNextLevelKeysToReach';
import { useStreakLength } from '../../business/streak/hooks/useStreakLength';
import useIsLastLevel from '../../hooks/useIsLastLevel';
import useSubscriptionOnAppStateChange from '../../hooks/useSubscriptionOnAppStateChange';
import useSubscriptionOnDateChange from '../../hooks/useSubscriptionOnDateChange';
import { getScaledDefaultFontSize } from '../../utils/getDiaryFontSizeByRatio';
import { isTimestampToday } from '../../utils/time';
import Text from '../Text';
import { LevelTextKey } from './LevelTextKey';

export const LevelKeysIndicator = () => {
  const { t } = useTranslation();
  const [level, lastLevelReachedDate] = useLevel();
  const isLastLevel = useIsLastLevel();
  const isStreakReachedToday = isTimestampToday(lastLevelReachedDate);
  const brokenStreakTS = useLastBrokenStreak();
  const currentStreakLength = useStreakLength();
  const lostKeys = useLostKeys();
  const isStreakBrokenToday = // broken streak== is today, and not used dealer (ignored!=true)
    currentStreakLength === 0 &&
    brokenStreakTS &&
    brokenStreakTS.fixed === false &&
    isTimestampToday(brokenStreakTS.date);
  const nextLevelKeysToReach = useNextLevelKeysToReach();

  useSubscriptionOnAppStateChange();
  useSubscriptionOnDateChange();

  if (isLastLevel) {
    return <Text size={getScaledDefaultFontSize()}>{t('inhalationStreakIncreased:maxLevel')}</Text>;
  }
  if (isStreakReachedToday) {
    const currentlyAchievedLevel = getLevelDescriptor(level - 1);
    return (
      <LevelTextKey
        keysCollected={currentlyAchievedLevel.unlockKeysNeeded}
        keysNeeded={currentlyAchievedLevel.unlockKeysNeeded}
        isBroken={false}
      />
    );
  }
  if (isStreakBrokenToday) {
    return (
      <LevelTextKey keysCollected={0} keysNeeded={nextLevelKeysToReach} isBroken={lostKeys !== 0} />
    );
  }
  // else normal streak reaching state
  return (
    <LevelTextKey
      keysCollected={currentStreakLength}
      keysNeeded={nextLevelKeysToReach}
      isBroken={false}
    />
  );
};
