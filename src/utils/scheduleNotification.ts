import notifee, {
  AndroidImportance,
  AndroidStyle,
  IOSAuthorizationStatus,
  Notification,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import firebase from '@react-native-firebase/app';

import { NotificationTypeT } from '../hooks/notifications/createNotificationType';
import { NotificationMetadataT } from '../types/notifications';
import { storeNotificationId } from './cancelNotification';

export type NotificationDataT = {
  fireDate: number;
  alertTitle: string;
  userInfo: NotificationTypeT | NotificationMetadataT; //any additional metadata
  alertBody?: string;
  category?: string;
  repeatInterval?: RepeatFrequency;
  sendAnalytics?: () => void;
};

export async function scheduleNotification(notificationData: NotificationDataT) {
  const { sendAnalytics, userInfo } = notificationData;
  const permissions = await notifee.requestPermission();
  if (permissions.authorizationStatus >= IOSAuthorizationStatus.AUTHORIZED) {
    if (sendAnalytics) {
      sendAnalytics();
    }
    const channelId = await createDefaultNotificationChannel();
    const notification = makeNotification(notificationData, channelId);
    const trigger = makeNotificationTrigger(notificationData);
    try {
      const id = await notifee.createTriggerNotification(notification, trigger);
      await storeNotificationId(userInfo, id);
    } catch (error) {
      console.error(error);
      await firebase.crashlytics().setAttribute('error-type', 'schedule-notification');
      firebase.crashlytics().recordError(error);
      throw error;
    }
  }
}

function makeNotificationTrigger({
  fireDate,
  repeatInterval,
}: NotificationDataT): TimestampTrigger {
  return {
    type: TriggerType.TIMESTAMP,
    timestamp: fireDate,
    repeatFrequency: repeatInterval,
  };
}

function makeNotification(
  { alertTitle, alertBody, userInfo }: NotificationDataT,
  channelId: string,
): Notification {
  return {
    title: alertTitle,
    body: alertBody,
    data: userInfo,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
      smallIcon: 'ic_small_icon',
      largeIcon: 'ic_launcher',
      style: alertBody
        ? {
            type: AndroidStyle.BIGTEXT,
            text: alertBody,
          }
        : undefined,
    },
    ios: {
      foregroundPresentationOptions: {
        sound: true,
        alert: true,
        badge: true,
      },
    },
  };
}

function createDefaultNotificationChannel() {
  return notifee.createChannel({
    id: 'default',
    name: 'defaultChannel',
    importance: AndroidImportance.HIGH,
    vibration: true,
    lights: true,
  });
}
