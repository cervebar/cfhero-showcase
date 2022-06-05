import React from 'react';
import { useTranslation } from 'react-i18next';

import useLevel from '../../../business/level/hooks/useLevel';
import useLostKeys from '../../../business/streak/hooks/useLostKeys';
import useNextLevelKeysToReach from '../../../business/streak/hooks/useNextLevelKeysToReach';
import useMyState from '../../../hooks/useMyState';
import Spacer from '../../../ui/Spacer';
import { KeysAndRewards } from '../../../ui/streak/KeysAndRewards';
import Text from '../../../ui/Text';
import {
  getScaledDefaultFontSize,
  getScaledH4FontSize,
} from '../../../utils/getDiaryFontSizeByRatio';

export const BrokenStreakMoreDays = () => {
  const { t } = useTranslation('brokenStreakScreen');
  const h3fontSize = getScaledH4FontSize();
  const defaultFontSize = getScaledDefaultFontSize();
  const [level] = useLevel();
  const nextLevel = level + 1;
  const nextLevelKeysToReach = useNextLevelKeysToReach();
  const lostKeys = useLostKeys();
  const gender = useMyState(state => state.user.gender);

  return (
    <>
      <Text color="darkBlue" size={h3fontSize} align="center">
        {t('multipleDaysTitle')}
      </Text>
      <Spacer padding={20} />
      <KeysAndRewards
        keysCount={lostKeys}
        level={nextLevel}
        keyMaxToShow={nextLevelKeysToReach}
        useBrokenKeys={true}
        isRewardLocked={true}
      />
      <Spacer padding={10} />
      <Text color="darkBlue" size={defaultFontSize}>
        {lostKeys === 0
          ? t('zeroLostKeys')
          : `${t('lostKeys', { context: gender, keysNumber: lostKeys })} ${t('collectedKeys', {
              postProcess: 'interval',
              count: lostKeys,
            })}
        `}
      </Text>
      <Spacer padding={20} />
      <Text color="darkBlue" size={h3fontSize} align="center">
        {t(lostKeys === 0 ? 'zeroLostKeysComeToFixIt' : 'comeFixIt')}
      </Text>
    </>
  );
};
