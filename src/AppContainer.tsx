import React from 'react';
import Toast from 'react-native-toast-message';
import {
  NavigationNavigator,
  NavigationProp,
  NavigationState,
  createAppContainer,
} from 'react-navigation';

import { useBrokenStreakChecker } from './business/streak/hooks/useBrokenStreakChecker';
import { useTestFairyInit } from './hooks/init/useTestFairyInit';
import { useNotificationClickedHandler } from './hooks/notifications/useNotificationClickedHandler';
import { usePlanFulfilledNotification } from './hooks/notifications/usePlanFulfilledNotification';
import { useBadgeHabitMasterChecker } from './hooks/useBadgeHabitMasterChecker';
import { useCheckNewVersionUpdates } from './hooks/useCheckNewVersionUpdates';
import { useFirebaseModalMessages } from './hooks/useFirebaseModalMessages';
import useFirebaseUserStateInit from './hooks/useFirebaseUserStateInit';
import useMyState from './hooks/useMyState';
import { useSeasonalThemeChecker } from './hooks/useSeasonalThemeChecker';
import { useShowStreakChangeInfoChecker } from './hooks/useShowStreakChangeInfoChecker';
import { useIsDatabaseVersionCorrect } from './middleware/migration';
import { MainNavigator } from './Navigators';
import { isDoNotDisturbModeEnabled } from './selectors/application';
import { toastConfig } from './toast/toastConfig';
import ReceivedBadgeModal from './ui/badges/ReceivedBadgeModal';

const AppContainerInner = () => {
  const doNotDisturb = useMyState(isDoNotDisturbModeEnabled);

  usePlanFulfilledNotification();
  useBrokenStreakChecker();
  useSeasonalThemeChecker();
  useFirebaseUserStateInit();
  useFirebaseModalMessages();
  useNotificationClickedHandler();
  useTestFairyInit();

  return (
    <>
      <Toast
        config={toastConfig}
        position="top"
        visibilityTime={3000}
        ref={ref => Toast.setRef(ref)}
      />
      {!doNotDisturb && <ReceivedBadgeModal />}
    </>
  );
};

const AppContainer: NavigationNavigator<{}, NavigationProp<NavigationState>> = props => {
  return (
    <>
      <MainNavigator {...props} />
      <AppContainerInner />
    </>
  );
};

AppContainer.router = MainNavigator.router;

export default createAppContainer(AppContainer);
