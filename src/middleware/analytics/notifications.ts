import { AdHocNotificationInfoT, NotificationT } from '../../types/notifications';
import { ReadNotificationEventT } from '../../types/tracking';
import { getUTCTimestampFromDate } from '../../utils/formatDate';
import {
  NOTIFICATION_CREATED,
  NOTIFICATION_DELETE,
  NOTIFICATION_READ,
  NOTIFICATION_UPDATE,
} from '../../utils/googleEvents';
import { logAnalyticsData, logUserPath } from './logEvents';

export const logNotificationCreated = (notification: NotificationT): void => {
  logUserPath(NOTIFICATION_CREATED + '_' + notification.id);
  const params = {
    timestamp: getUTCTimestampFromDate(new Date()),
    type: notification.type,
    name: notification.name,
    id: notification.id,
    category: notification.category,
    hour: notification.hour,
    minute: notification.minute,
    checked: notification.checked,
  };
  logAnalyticsData(NOTIFICATION_CREATED, params);
};

export const logNotificationRead = (data: ReadNotificationEventT): void => {
  logUserPath(NOTIFICATION_READ + '_' + data.id);
  const params = {
    timestamp: data.timestamp,
    id: data.id,
  };
  logAnalyticsData(NOTIFICATION_READ, params);
};

export const logNotificationUpdate = (notification: NotificationT): void => {
  logUserPath(NOTIFICATION_UPDATE + '_' + notification.id);
  const params = {
    timestamp: getUTCTimestampFromDate(new Date()),
    type: notification.type,
    name: notification.name,
    id: notification.id,
    category: notification.category,
    hour: notification.hour,
    minute: notification.minute,
    checked: notification.checked,
  };
  logAnalyticsData(NOTIFICATION_UPDATE, params);
};

export const logDeleteNotification = (notification: NotificationT): void => {
  logUserPath(NOTIFICATION_DELETE + '_' + notification.id);
  const params = {
    name: notification.name,
    id: notification.id,
    category: notification.category,
  };
  logAnalyticsData(NOTIFICATION_DELETE, params);
};

export const logInitNotification = (initialNotifications: NotificationT[]): void => {
  initialNotifications.forEach(n => logNotificationCreated(n));
};

export const logAdHocNotificationCreated = (data: AdHocNotificationInfoT): void => {
  logUserPath(NOTIFICATION_CREATED + '_' + data.id);
  const params = {
    timestamp: getUTCTimestampFromDate(new Date()),
    type: 'adhoc',
    id: data.id,
    hour: data.hour,
    minute: data.minute,
  };
  logAnalyticsData(NOTIFICATION_CREATED, params);
};

export const logAdHocNotificationUpdated = (data: AdHocNotificationInfoT): void => {
  logUserPath(NOTIFICATION_UPDATE + '_' + data.id);
  const params = {
    timestamp: getUTCTimestampFromDate(new Date()),
    type: 'adhoc',
    id: data.id,
    checked: data.checked,
  };
  logAnalyticsData(NOTIFICATION_UPDATE, params);
};
