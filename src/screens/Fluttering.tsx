import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { addCompletedFluttering } from '../actions/fluttering';
import { trackStartSessionEvent } from '../actions/tracking';
import { INHALATION_MAX_PAUSED_LENGTH_SEC } from '../constants/inhalation';
import { DevSessionButtons } from '../containers/cheatsdev/DevSessionButtons';
import AnimatedOxygenFluttering from '../containers/fluttering/AnimatedOxygenFluttering';
import FlutteringLengthModal from '../containers/fluttering/FlutteringLengthModal';
import {
  FLUTTER_MIN_TIME,
  FLUTTER_OXYGENS_COLLECT_COUNT_MAX,
  FLUTTER_OXYGENS_COLLECT_COUNT_MIN,
  FLUTTER_OXYGEN_ADDED_DELAY,
} from '../containers/inhalation/constants';
import SessionContext from '../containers/session/SessionContext';
import SessionCountdown from '../containers/session/steps/SessionCountdown';
import SessionProcess from '../containers/session/steps/SessionProcess';
import SessionTerminationModal from '../containers/session/steps/SessionTerminationModal';
import useSessionContext from '../containers/session/useSessionContext';
import useDelayedFlutteringNotifications from '../hooks/notifications/useDelayedFlutteringNotification';
import { useBackgroundsId } from '../hooks/selectors/useBackgroundsId';
import useMyState from '../hooks/useMyState';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { SessionResolutionState, SessionT, SessionType } from '../types/session';
import ButtonInHeader from '../ui/ButtonInHeader';
import Screen from '../ui/Screen';
import { getFlutteringBackground } from '../utils/seasonalThemes/seasonalTheme';
import { getTimestamp } from '../utils/time';

const oxygenLimitProvider = () => {
  const min = FLUTTER_OXYGENS_COLLECT_COUNT_MIN;
  const max = FLUTTER_OXYGENS_COLLECT_COUNT_MAX;

  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const Fluttering = () => {
  const { t } = useTranslation();
  const { navigate } = useNav();
  const dispatch = useDispatch();

  const currentFlutterId = useMyState(state => state.flutter.activeId);
  const backgroundsId = useBackgroundsId();

  useEffect(() => {
    dispatch(
      trackStartSessionEvent({
        timestampCreated: getTimestamp(new Date()),
        deviceId: currentFlutterId,
        isFluttering: true,
      }),
    );
  }, [dispatch, currentFlutterId]);

  const { removeDelayedFlutteringNotifications, removeDelayedFlutteringReminderNotifications } =
    useDelayedFlutteringNotifications();

  const onSessionFinished = useCallback(
    (state: SessionResolutionState, session: SessionT) => {
      dispatch(
        addCompletedFluttering({
          ...session,
          duration: Math.min(INHALATION_MAX_PAUSED_LENGTH_SEC, session.duration),
          flutterId: currentFlutterId,
        }),
      );

      if (state !== SessionResolutionState.ok) {
        navigate(Routes.Home);
        return;
      }

      removeDelayedFlutteringNotifications();
      removeDelayedFlutteringReminderNotifications();
      navigate(Routes.FlutteringSuccess, { session });
    },
    [
      dispatch,
      currentFlutterId,
      navigate,
      removeDelayedFlutteringNotifications,
      removeDelayedFlutteringReminderNotifications,
    ],
  );

  const context = useSessionContext(
    SessionType.fluttering,
    Routes.Fluttering,
    FLUTTER_MIN_TIME,
    FLUTTER_OXYGEN_ADDED_DELAY,
    oxygenLimitProvider,
    AnimatedOxygenFluttering,
    useMyState(state => state.fluttering.pdvVisited),
    onSessionFinished,
  );

  const { visibleCountdown, terminateSession } = context;

  return (
    <Screen
      gradient="fluttering"
      withBackButton={!visibleCountdown}
      onBackButtonPress={terminateSession}
      backgroundImage={getFlutteringBackground(backgroundsId)}
      headerRightComponent={
        visibleCountdown ? null : (
          <ButtonInHeader onPress={terminateSession}>{t('shared:buttons.finish')}</ButtonInHeader>
        )
      }
      qaID="FLUTTERING">
      <SessionContext.Provider value={context}>
        <SessionCountdown />
        <SessionProcess />
        <DevSessionButtons />
        <FlutteringLengthModal />
        <SessionTerminationModal />
      </SessionContext.Provider>
    </Screen>
  );
};

export default Fluttering;
