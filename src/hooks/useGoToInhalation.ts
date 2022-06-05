import { useCallback } from 'react';

import { Routes } from '../Routes';
import { InhalationTourStep } from '../types/application';
import useMyState from './useMyState';
import useNav from './useNav';

const useGoToInhalation = () => {
  const { navigate } = useNav();
  const inhalationTourStep = useMyState(state => state.application.inhalationTourStep);
  const totalSuccessfulInhalations = useMyState(
    state => state.inhalation.totalSuccessfulInhalations,
  );

  return useCallback(() => {
    switch (inhalationTourStep) {
      case InhalationTourStep.inhalationsCount:
        navigate(Routes.DailyInhalation);
        return;
      case InhalationTourStep.prepareInhalator:
        navigate(Routes.FirstInhalationPrepareInhalator);
        return;
      case InhalationTourStep.howToInhale:
        navigate(Routes.FirstInhalationHowTo);
        return;
      default:
        if (totalSuccessfulInhalations === 2) {
          navigate(Routes.BreathPattern);
        } else {
          navigate(Routes.InhalationSetup);
        }
        break;
    }
  }, [navigate, inhalationTourStep, totalSuccessfulInhalations]);
};

export default useGoToInhalation;
