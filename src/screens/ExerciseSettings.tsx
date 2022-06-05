import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import { ExerciseSettingsContent } from '../containers/settings/ExerciseSettingsContent';
import Screen from '../ui/Screen';
import { ANALYTICS_VIEW_SETTINGS_EXERCISE_SCREEN } from '../utils/googleEvents';

export const ExerciseSettingsScreen: FC = () => {
  const { t } = useTranslation('settingsNavigation');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_VIEW_SETTINGS_EXERCISE_SCREEN));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen headerTitle={t('exercise')} withScrollView qaID="exerciseSettings">
      <ExerciseSettingsContent />
    </Screen>
  );
};
