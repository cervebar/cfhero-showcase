import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { amendStreak } from '../../../actions/streak';
import useLevel from '../../../business/level/hooks/useLevel';
import useLostKeys from '../../../business/streak/hooks/useLostKeys';
import useNextLevelKeysToReach from '../../../business/streak/hooks/useNextLevelKeysToReach';
import { TOUT_KEYS_BUYOUT_PRICE } from '../../../constants/tout';
import useMyState from '../../../hooks/useMyState';
import useNav from '../../../hooks/useNav';
import { Routes } from '../../../Routes';
import Spacer from '../../../ui/Spacer';
import { KeysAndRewards } from '../../../ui/streak/KeysAndRewards';
import Text from '../../../ui/Text';
import { ToutOffer } from '../../../ui/tout/ToutOffer';
import {
  getScaledH4FontSize,
  getScaledSmallFontSize,
} from '../../../utils/getDiaryFontSizeByRatio';
import styled from '../../../utils/theme/styledComponents';
import { Balance } from '../../Balance';

const BalanceWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-top: -10px;
  padding-bottom: 5px;
`;

export const BrokenStreakSingleDay = () => {
  const dispatch = useDispatch();
  const { navigate } = useNav();
  const { t } = useTranslation('brokenStreakScreen');
  const fontSizeHeading = getScaledH4FontSize();
  const [level] = useLevel();
  const nextLevel = level + 1;
  const nextLevelKeysToReach = useNextLevelKeysToReach();
  const lostKeys = useLostKeys();
  const gender = useMyState(state => state.user.gender);
  const hasEnough = useMyState(state => state.balance.balance) >= TOUT_KEYS_BUYOUT_PRICE;
  const showTout = lostKeys !== 0;

  const buy = useCallback(() => {
    dispatch(amendStreak());
    navigate(Routes.Home);
  }, [dispatch, navigate]);

  return (
    <>
      {showTout && (
        <BalanceWrapper>
          <Balance fontSize={getScaledSmallFontSize()} />
        </BalanceWrapper>
      )}
      <Text color="darkBlue" size={fontSizeHeading} align="center">
        {t('singleDayTitle')}
      </Text>
      <KeysAndRewards
        keysCount={lostKeys}
        level={nextLevel}
        keyMaxToShow={nextLevelKeysToReach}
        useBrokenKeys={true}
        isRewardLocked={true}
      />
      <Text color="darkBlue" size={fontSizeHeading}>
        {lostKeys === 0
          ? t('zeroLostKeys')
          : `${t('lostKeys', { context: gender, keysNumber: lostKeys })} ${t('collectedKeys', {
              postProcess: 'interval',
              count: lostKeys,
            })}
        `}
      </Text>
      {showTout && <ToutOffer onBuyTout={buy} hasEnough={hasEnough} />}
      <Spacer padding={5} />
    </>
  );
};
