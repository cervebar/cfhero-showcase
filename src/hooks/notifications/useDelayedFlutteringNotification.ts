import { Notification } from '@notifee/react-native';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { trackAdHocNotificationCreated } from '../../actions/notifications';
import { Routes } from '../../Routes';
import { cancelNotificationsOfTypes } from '../../utils/cancelNotification';
import {
  NOTIFICATION_FLUTTERING_START_IN_SOME_MINUTES,
  NOTIFICATION_FLUTTERING_START_NOW,
} from '../../utils/googleEvents';
import { scheduleNotification } from '../../utils/scheduleNotification';
import { subscribeNotificationPressed } from '../../utils/subscribeNotificationPressed';
import useNav from '../useNav';
import { createNotificationType } from './createNotificationType';

const NOTIFICATION_FLUTTERING_START_NOW_TYPE = createNotificationType(
  NOTIFICATION_FLUTTERING_START_NOW,
);

const NOTIFICATION_FLUTTERING_START_IN_SOME_MINUTES_TYPE = createNotificationType(
  NOTIFICATION_FLUTTERING_START_IN_SOME_MINUTES,
);

const FIFTEEN_MINUTES_MS = 1000 * 60 * 15;
const ONE_MINUTE_MS = 1000 * 60;

type useDelayedFlutteringNotificationsT = () => {
  setDelayedFlutteringNotifications: (delay: number) => void;
  removeDelayedFlutteringNotifications: () => void;
  removeDelayedFlutteringReminderNotifications: () => void;
};

export const useDelayedFlutteringNotifications: useDelayedFlutteringNotificationsT = () => {
  const { t } = useTranslation('notifications');
  const dispatch = useDispatch();

  const { navigate } = useNav();

  const removeDelayedFlutteringNotifications = useCallback(
    () => cancelNotificationsOfTypes([NOTIFICATION_FLUTTERING_START_NOW_TYPE]),
    [],
  );

  const removeDelayedFlutteringReminderNotifications = useCallback(
    () => cancelNotificationsOfTypes([NOTIFICATION_FLUTTERING_START_IN_SOME_MINUTES_TYPE]),
    [],
  );

  const handleLocalNotification = useCallback(
    async ({ data }: Notification) => {
      if (data?.notificationType === NOTIFICATION_FLUTTERING_START_NOW_TYPE.notificationType) {
        navigate(Routes.FlutteringSetup);
        // Delete all previous notifications
        await Promise.allSettled([
          removeDelayedFlutteringNotifications(),
          removeDelayedFlutteringReminderNotifications(),
        ]);
      }
    },
    [navigate, removeDelayedFlutteringNotifications, removeDelayedFlutteringReminderNotifications],
  );

  const setDelayedFlutteringNotifications = async (delay: number) => {
    // Delete all previous notifications
    await removeDelayedFlutteringNotifications();
    await removeDelayedFlutteringReminderNotifications();

    const fireDate: Date = new Date(Date.now() + delay);
    const fifteenMinutesBeforeFlutteringDate = new Date(
      Date.now() + Math.max(delay - FIFTEEN_MINUTES_MS, ONE_MINUTE_MS),
    );

    return Promise.all([
      scheduleNotification({
        fireDate: fireDate.getTime(),
        alertTitle: t('delayedFluttering.title'),
        alertBody: t('delayedFluttering.body'),
        userInfo: NOTIFICATION_FLUTTERING_START_NOW_TYPE,
        sendAnalytics: (): void => {
          dispatch(
            trackAdHocNotificationCreated({
              id: 'NOTIFICATION_FLUTTERING_START_NOW_TYPE',
              hour: fireDate.getHours(),
              minute: fireDate.getMinutes(),
            }),
          );
        },
      }),
      scheduleNotification({
        fireDate: fifteenMinutesBeforeFlutteringDate.getTime(),
        alertTitle: t('delayedFlutteringReminder.title'),
        alertBody: t('delayedFlutteringReminder.body'),
        userInfo: NOTIFICATION_FLUTTERING_START_IN_SOME_MINUTES_TYPE,
        sendAnalytics: (): void => {
          dispatch(
            trackAdHocNotificationCreated({
              id: 'NOTIFICATION_FLUTTERING_START_IN_SOME_MINUTES',
              hour: fifteenMinutesBeforeFlutteringDate.getHours(),
              minute: fifteenMinutesBeforeFlutteringDate.getMinutes(),
            }),
          );
        },
      }),
    ]);
  };

  useEffect(() => subscribeNotificationPressed(handleLocalNotification), [handleLocalNotification]);

  return {
    setDelayedFlutteringNotifications,
    removeDelayedFlutteringNotifications,
    removeDelayedFlutteringReminderNotifications,
  };
};
