import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import { SettingsSeasonalThemeContent } from '../containers/settings/seasonalChange/SettingsSeasonalThemeContent';
import Screen from '../ui/Screen';
import { ANALYTICS_VIEW_PERSONAL_SEASONAL_SETTINGS } from '../utils/googleEvents';

export const SettingsSeasonalChangeScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_VIEW_PERSONAL_SEASONAL_SETTINGS));
  }, [dispatch]);
  return (
    <Screen
      headerTitle={t('settingsNavigation:seasonalThemeSettings')}
      verticalSpacing
      withScrollView
      qaID="settings_seasonal_theme">
      <SettingsSeasonalThemeContent />
    </Screen>
  );
};
