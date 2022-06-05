import notifee, { EventType, Notification } from '@notifee/react-native';
import firebase from '@react-native-firebase/app';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { trackNotificationRead } from '../../actions/tracking';
import { Routes } from '../../Routes';
import { NotificationHandler, NotificationRoute } from '../../types/notifications';
import { getUTCTimestampFromDate } from '../../utils/formatDate';
import { emitNotificationPressed } from '../../utils/subscribeNotificationPressed';
import useAppStateChange from '../useAppStateChange';
import useNav from '../useNav';

let handledNotificationIds: string[] = [];

/**
 * handle incoming all notifications
 * + send analytic event anytime the notification is clicked by user
 */
export const useNotificationClickedHandler = (): void => {
  const dispatch = useDispatch();
  const { navigate } = useNav();

  const handleNavigation = useCallback(
    data => {
      if (data.handler !== NotificationHandler.USE_NOTIFICATION_CLICKED_HANDLER) {
        return;
      }
      switch (data.route) {
        case NotificationRoute.INHALATION_SETUP_ROUTE:
          navigate(Routes.InhalationSetup);
          break;
        case NotificationRoute.FLUTTERING_SETUP_ROUTE:
          navigate(Routes.FlutteringSetup);
          break;
        case NotificationRoute.HOMESCREEN_ROUTE:
          navigate(Routes.Home);
          break;
        case NotificationRoute.SETTINGS_NOTIFICATIONS:
          navigate(Routes.Notification);
          break;
        default:
          navigate(Routes.Home);
      }
    },
    [navigate],
  );

  const handleNotificationPressed = useCallback(
    (notification: Notification) => {
      if (!shouldHandleNotification(notification)) {
        return;
      }
      dispatch(
        trackNotificationRead({
          timestamp: getUTCTimestampFromDate(new Date()),
          id:
            notification.data?.notificationId ??
            notification.data?.notificationType ??
            'UNKNOWN_NOTIFICATION_ID',
        }),
      );
      handleNavigation(notification?.data);
      emitNotificationPressed(notification);
    },
    [dispatch, handleNavigation],
  );

  const handleForegroundNotification = useCallback(
    () =>
      notifee.onForegroundEvent(({ type, detail }) => {
        if (type === EventType.PRESS && detail.notification) {
          handleNotificationPressed(detail.notification);
        }
      }),
    [handleNotificationPressed],
  );

  const handleInitialNotification = useCallback(async () => {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification) {
      handleNotificationPressed(initialNotification.notification);
    }
  }, [handleNotificationPressed]);

  useAppStateChange({
    active: () => handleInitialNotification().catch(e => firebase.crashlytics().recordError(e)),
  });

  useEffect(() => handleForegroundNotification(), [handleForegroundNotification]);

  useEffect(() => {
    // We want to handle the initial notification when the app "cold" launches
    // The app state listener will not fire in that case, hence useEffect during the first render
    // App state listener will handle the case where the app is in background
    handleInitialNotification().catch(e => firebase.crashlytics().recordError(e));
  }, [handleInitialNotification]);
};

function shouldHandleNotification(notification: Notification): boolean {
  if (!notification.id) {
    return false;
  }
  if (handledNotificationIds.includes(notification.id)) {
    return false;
  }
  handledNotificationIds.push(notification.id);
  return true;
}
