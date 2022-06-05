import React from 'react';
import { useNavigationParam } from 'react-navigation-hooks';

import ComicShopButton from '../containers/sessionSuccess/components/buttons/ComicShopButton';
import FlutteringButton from '../containers/sessionSuccess/components/buttons/FlutteringButton';
import SessionSuccessOverview from '../containers/sessionSuccess/steps/SessionSuccessOverview';
import { usePreventHardwareBackPressNavigationPop } from '../hooks/useHandleHardwareBackPress';
import useMyState from '../hooks/useMyState';
import { SessionT } from '../types/session';
import Screen from '../ui/Screen';

const InhalationSuccess = () => {
  const session = useNavigationParam('session') as SessionT;
  const fortuneWheelOxygens = useNavigationParam('fortuneWheelOxygens') as number;

  const totalSuccessfulInhalations = useMyState(
    state => state.inhalation.totalSuccessfulInhalations,
  );

  usePreventHardwareBackPressNavigationPop();

  return (
    <Screen withHeader={false} qaID="INHALATION_FINISH">
      <SessionSuccessOverview
        session={session}
        fortuneWheelOxygens={fortuneWheelOxygens}
        button={totalSuccessfulInhalations > 1 ? FlutteringButton : ComicShopButton}
      />
    </Screen>
  );
};

export default InhalationSuccess;
