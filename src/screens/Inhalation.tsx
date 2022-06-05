import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { addMorningLarkCount, addNightOwlCount } from '../actions/badgeChecks';
import { addCompletedInhalation } from '../actions/inhalation';
import { addUsedMedicine } from '../actions/medicine';
import { trackStartSessionEvent, trackUserPath } from '../actions/tracking';
import useLevel from '../business/level/hooks/useLevel';
import { useStreakLength } from '../business/streak/hooks/useStreakLength';
import { INHALATION_MAX_PAUSED_LENGTH_SEC } from '../constants/inhalation';
import { DevSessionButtons } from '../containers/cheatsdev/DevSessionButtons';
import AnimatedOxygenInhalation from '../containers/inhalation/AnimatedOxygenInhalation';
import {
  INHALATION_MIN_TIME,
  INHALATION_OXYGENS_COLLECT_COUNT_MAX,
  INHALATION_OXYGENS_COLLECT_COUNT_MIN,
  INHALATION_OXYGEN_ADDED_DELAY,
  MAX_LEVEL,
} from '../containers/inhalation/constants';
import { InhalationLengthModal } from '../containers/inhalation/InhalationLengthModal';
import { InhalationPostponeFlutteringModal } from '../containers/inhalation/InhalationPostponeFlutteringModal';
import SessionContext from '../containers/session/SessionContext';
import SessionCountdown from '../containers/session/steps/SessionCountdown';
import SessionProcess from '../containers/session/steps/SessionProcess';
import SessionTerminationModal from '../containers/session/steps/SessionTerminationModal';
import useSessionContext from '../containers/session/useSessionContext';
import { useBackgroundsId } from '../hooks/selectors/useBackgroundsId';
import { useFulFilledPlan } from '../hooks/useFulFilledPlan';
import { usePreventHardwareBackPressNavigationPop } from '../hooks/useHandleHardwareBackPress';
import { useLocalizedMedicines } from '../hooks/useLocalized';
import useMyState from '../hooks/useMyState';
import useNav from '../hooks/useNav';
import { Routes, RoutesT } from '../Routes';
import { isFirstInhalation } from '../selectors/inhalation';
import { getMedicineAmount } from '../selectors/medicine';
import { CompletedSessionT, SessionResolutionState, SessionT, SessionType } from '../types/session';
import ButtonInHeader from '../ui/ButtonInHeader';
import Screen from '../ui/Screen';
import { ANALYTICS_ONBOARDING_FIRST_INHALATION_DONE } from '../utils/googleEvents';
import { getInhalationBackground } from '../utils/seasonalThemes/seasonalTheme';
import { getTimestamp } from '../utils/time';

const oxygenLimitProvider = () => {
  const min = INHALATION_OXYGENS_COLLECT_COUNT_MIN;
  const max = INHALATION_OXYGENS_COLLECT_COUNT_MAX;

  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

type SessionFinishedNavParams = {
  nextScreen: RoutesT;
  params: {
    session?: CompletedSessionT;
    goToKeyScreen?: boolean;
  };
};

const InhalationScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNav();
  const dispatch = useDispatch();
  const medicines = useLocalizedMedicines();

  const sessionFinishedNavParamsRef = useRef<SessionFinishedNavParams>({
    nextScreen: Routes.InhalationSuccess,
    params: {},
  });

  const [postponedFlutteringDelays, setPostponedFlutteringDelays] = useState<
    number[] | undefined
  >();

  const currentMedicine = useMyState(state => state.medicine.currentMedicine);
  const currentMedicineAmount = useMyState(getMedicineAmount);
  const currentInhalatorId = useMyState(state => state.inhalator.activeId);
  const firstInhalation = useMyState(isFirstInhalation);
  const isPlanFulilled = useFulFilledPlan();
  const backgroundsId = useBackgroundsId();

  const currentStreakLength = useStreakLength();
  const [currentLevel] = useLevel();
  const [startSessionStreakLength] = useState(currentStreakLength);
  const [startSessionLevel] = useState(currentLevel);
  const [sessionResolutionState, setSessionResolutionState] =
    useState<SessionResolutionState | null>(null);

  const navigateUsingSessionFinishedNavParams = useCallback(() => {
    navigate(
      sessionFinishedNavParamsRef.current.nextScreen,
      sessionFinishedNavParamsRef.current.params,
    );
  }, [navigate]);

  const prepareSessionFinishedNavParams = useCallback(() => {
    if (isPlanFulilled) {
      const goToKeyScreen =
        // When the user's level and streak length has increased at the ond of this session
        currentLevel < MAX_LEVEL &&
        (startSessionLevel !== currentLevel || currentStreakLength !== startSessionStreakLength);
      sessionFinishedNavParamsRef.current.nextScreen = Routes.WheelOfFortune;
      sessionFinishedNavParamsRef.current.params.goToKeyScreen = goToKeyScreen;
    } else {
      sessionFinishedNavParamsRef.current.nextScreen =
        startSessionLevel !== currentLevel || currentStreakLength !== startSessionStreakLength
          ? Routes.InhalationStreakIncreased
          : Routes.InhalationSuccess;
    }
  }, [
    currentLevel,
    currentStreakLength,
    isPlanFulilled,
    startSessionLevel,
    startSessionStreakLength,
  ]);

  const navigateToNextScreenOrDisplayPostponedFlutteringModal = useCallback(() => {
    if (!currentMedicine) {
      //onboarding state
      return navigateUsingSessionFinishedNavParams();
    }

    const currentMedicineData = medicines[currentMedicine];
    if (!currentMedicineData?.flutteringDelayMs) {
      return navigateUsingSessionFinishedNavParams();
    } else {
      setPostponedFlutteringDelays(currentMedicineData.flutteringDelayMs);
    }
  }, [currentMedicine, medicines, navigateUsingSessionFinishedNavParams]);

  const onSessionFinished = useCallback(
    (state: SessionResolutionState, session: SessionT) => {
      dispatch(
        addCompletedInhalation({
          ...session,
          duration: Math.min(INHALATION_MAX_PAUSED_LENGTH_SEC, session.duration),
          medicine: currentMedicine,
          medicineAmount: currentMedicineAmount,
          inhalatorId: currentInhalatorId,
        }),
      );

      dispatch(addUsedMedicine(currentMedicine));
      if (firstInhalation) {
        dispatch(trackUserPath(ANALYTICS_ONBOARDING_FIRST_INHALATION_DONE));
      }

      if (state !== SessionResolutionState.ok) {
        navigate(Routes.Home);
        return;
      }
      setSessionResolutionState(state);

      const nowHours = new Date().getHours();
      if (nowHours >= 22) dispatch(addNightOwlCount());
      if (nowHours < 6) dispatch(addMorningLarkCount());

      sessionFinishedNavParamsRef.current.params.session = {
        ...session,
        startLevel: startSessionLevel,
        startStreak: startSessionStreakLength,
      };
    },
    [
      dispatch,
      currentMedicine,
      currentMedicineAmount,
      currentInhalatorId,
      firstInhalation,
      startSessionLevel,
      startSessionStreakLength,
      navigate,
    ],
  );

  const context = useSessionContext(
    SessionType.inhalation,
    Routes.Inhalation,
    INHALATION_MIN_TIME,
    INHALATION_OXYGEN_ADDED_DELAY,
    oxygenLimitProvider,
    AnimatedOxygenInhalation,
    useMyState(state => state.inhalation.pdvVisited),
    onSessionFinished,
  );

  const { visibleCountdown, terminateSession } = context;

  useEffect(() => {
    dispatch(
      trackStartSessionEvent({
        timestampCreated: getTimestamp(new Date()),
        medicine: currentMedicine,
        medicineAmount: currentMedicineAmount,
        deviceId: currentInhalatorId,
        isFluttering: false,
      }),
    );
  }, [dispatch, currentMedicine, currentMedicineAmount, currentInhalatorId]);

  useEffect(() => {
    // Executing navigation logic here, instead from inside the onSessionFinished callback. Because we need the latest values from useState and useSelector hooks.
    if (sessionResolutionState === SessionResolutionState.ok) {
      prepareSessionFinishedNavParams();
      navigateToNextScreenOrDisplayPostponedFlutteringModal();
    }
  }, [
    navigateUsingSessionFinishedNavParams,
    navigateToNextScreenOrDisplayPostponedFlutteringModal,
    prepareSessionFinishedNavParams,
    sessionResolutionState,
  ]);

  usePreventHardwareBackPressNavigationPop();

  return (
    <Screen
      gradient="inhalation"
      withBackButton={!visibleCountdown}
      onBackButtonPress={terminateSession}
      backgroundImage={getInhalationBackground(backgroundsId)}
      headerRightComponent={
        visibleCountdown ? null : (
          <ButtonInHeader onPress={terminateSession}>{t('shared:buttons.finish')}</ButtonInHeader>
        )
      }
      qaID="INHALATION">
      <SessionContext.Provider value={context}>
        <SessionCountdown />
        <SessionProcess />
        <DevSessionButtons />
        <InhalationLengthModal />
        <SessionTerminationModal />
        <InhalationPostponeFlutteringModal
          postponedFlutteringDelays={postponedFlutteringDelays}
          onConfirm={navigateUsingSessionFinishedNavParams}
        />
      </SessionContext.Provider>
    </Screen>
  );
};

export default InhalationScreen;
