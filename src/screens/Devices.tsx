import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import { DevicesSectionFlutters } from '../containers/settings/devices/DevicesSectionFlutters';
import { SectionInhalators } from '../containers/settings/devices/SectionInhalators';
import Screen from '../ui/Screen';
import { ANALYTICS_VIEW_SETTINGS_DEVICE_MEDICINE_BADGES_SCREEN } from '../utils/googleEvents';

export const DevicesScreen: FC = () => {
  const { t } = useTranslation('settingsNavigation');
  const dispath = useDispatch();

  useEffect(() => {
    dispath(trackUserPath(ANALYTICS_VIEW_SETTINGS_DEVICE_MEDICINE_BADGES_SCREEN));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen headerTitle={t('devices')} withScrollView qaID="settings_devices">
      <SectionInhalators />
      <DevicesSectionFlutters />
    </Screen>
  );
};
