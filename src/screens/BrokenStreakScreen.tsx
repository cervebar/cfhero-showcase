import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { visitStreak } from '../actions/streak';
import { useLastBrokenStreak } from '../business/streak/hooks/useLastBrokenStreak';
import { BrokenStreakMoreDays } from '../containers/tout/states/BrokenStreakMoreDays';
import { BrokenStreakSingleDay } from '../containers/tout/states/BrokenStreakSingleDay';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { BrokenStreakStatus } from '../types/streak';
import Button from '../ui/Button';
import Screen from '../ui/Screen';

export const BrokenStreakScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { navigate, goBack } = useNav();
  useEffect(() => {
    dispatch(visitStreak());
  }, [dispatch]);

  const lastBrokenStreak = useLastBrokenStreak();
  useEffect(() => {
    if (!lastBrokenStreak) {
      navigate(Routes.Home);
    }
  }, [lastBrokenStreak, navigate]);

  const isPermanentlyBrokenStreak = lastBrokenStreak?.status === BrokenStreakStatus.Permanent;

  const goToInhalation = useCallback(() => {
    navigate(Routes.InhalationSetup);
  }, [navigate]);

  const closeOverlayContent = (
    <Button
      // On single day broken streak, only close option is visible
      borderless
      dark={!isPermanentlyBrokenStreak}
      onPress={() => goBack()}
      qaID="broken_streak_go_to_back">
      {t('common:close')}
    </Button>
  );

  const goToInhalationOverlayContent = (
    <Button dark onPress={goToInhalation} qaID="broken_streak_go_to_inhalation">
      {t('brokenStreakScreen:goToInhalation')}
    </Button>
  );
  return isPermanentlyBrokenStreak ? (
    <Screen
      withHeader={false}
      qaID="BROKEN_STREAK_SCREEN"
      bottomLeftOverlayContent={closeOverlayContent}
      bottomRightOverlayContent={goToInhalationOverlayContent}>
      <BrokenStreakMoreDays />
    </Screen>
  ) : (
    <Screen
      withHeader={false}
      qaID="BROKEN_STREAK_SCREEN"
      bottomRightOverlayContent={closeOverlayContent}>
      <BrokenStreakSingleDay />
    </Screen>
  );
};
