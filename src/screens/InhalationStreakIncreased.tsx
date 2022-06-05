import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigationParam } from 'react-navigation-hooks';

import { SessionSuccessStreakIncreased } from '../containers/sessionSuccess/steps/SessionSuccessStreakIncreased';
import { usePreventHardwareBackPressNavigationPop } from '../hooks/useHandleHardwareBackPress';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { CompletedSessionT } from '../types/session';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import { normalize } from '../utils/normalizeSizes';

export const InhalationStreakIncreased = () => {
  const { t } = useTranslation('shared');
  const session = useNavigationParam('session') as CompletedSessionT;
  const fortuneWheelOxygens = useNavigationParam('fortuneWheelOxygens') as number;

  const { navigate } = useNav();

  const onContinueButtonPress = useCallback(
    () => navigate(Routes.InhalationSuccess, { session, fortuneWheelOxygens: fortuneWheelOxygens }),
    [fortuneWheelOxygens, navigate, session],
  );

  const bottomRightOverlayContent = (
    <Button dark onPress={onContinueButtonPress} qaID="CONTINUE">
      {t('buttons.continue')}
    </Button>
  );

  usePreventHardwareBackPressNavigationPop();

  return (
    <Screen
      withHeader={false}
      bottomRightOverlayContent={bottomRightOverlayContent}
      bottomPadding={normalize(70)}
      qaID="INHALATION_STREAK_INCREASED">
      <SessionSuccessStreakIncreased session={session} />
    </Screen>
  );
};
