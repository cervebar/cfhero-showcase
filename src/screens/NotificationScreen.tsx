import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import { NotificationContent } from '../containers/notifications/NotificationContent';
import Screen from '../ui/Screen';
import { ANALYTICS_VIEW_SETTINGS_NOTIFICATION_SCREEN } from '../utils/googleEvents';

export const NotificationScreen: FC = () => {
  const { t } = useTranslation('notificationSettings');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_VIEW_SETTINGS_NOTIFICATION_SCREEN));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen headerTitle={t('title')} withScrollView qaID="NOTIFICATION">
      <NotificationContent />
    </Screen>
  );
};
