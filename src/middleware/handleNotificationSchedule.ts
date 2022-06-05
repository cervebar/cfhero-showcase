import { RepeatFrequency } from '@notifee/react-native';
import firebase from '@react-native-firebase/app';
import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';

import { importAndroidUserData } from '../actions/application';
import { setDailyPlannedInhalations } from '../actions/inhalation';
import {
  createNotificationSettings,
  deleteNotificationSettings,
  initNotificationSettings,
  updateNotification,
} from '../actions/notifications';
import { RootStateType } from '../reducers/rootReducers';
import { NotificationT, NotificationTextsT, SYSTEM_TYPE } from '../types/notifications';
import { cancelNotificationsOfTypes } from '../utils/cancelNotification';
import { getClosesMatchDay, getDayCode } from '../utils/formatDate';
import i18n from '../utils/i18n';
import {
  createNotificationMetadata,
  notificationUpdatesForChangeInhalationPlan,
} from '../utils/notifications';
import { scheduleNotification } from '../utils/scheduleNotification';

const removeNotification = (notification: NotificationT): void => {
  notification.repeating.forEach((day: string) => {
    cancelNotificationsOfTypes([
      createNotificationMetadata(notification.id + '_' + day, notification.id, notification.route),
    ]);
  });
};

/*
 * hack the weekend vs workday with schedule interval of week: as here suggested https://stackoverflow.com/questions/45014580/cancel-repeating-localnotification-on-weekends-reactnative
 */
const scheduleNotificationSettings = (notification: NotificationT): void => {
  notification.repeating.forEach((day: string) => {
    const fireDate: Date = getClosesMatchDay(day, notification.hour, notification.minute);
    const notificationTextData: NotificationTextsT =
      notification.type === SYSTEM_TYPE
        ? mapTexts(notification, day)
        : { title: notification.texts[0].title, body: notification.texts[0].body };
    scheduleNotification({
      fireDate: fireDate.getTime(),
      alertTitle: notificationTextData.title,
      alertBody: notificationTextData.body,
      userInfo: createNotificationMetadata(
        notification.id + '_' + day,
        notification.id,
        notification.route,
      ),
      repeatInterval: RepeatFrequency.WEEKLY,
    });
  });
};

/**
 * different notification texts (pseudo-random): 1,2,3 for week days, 1,2 for weekends
 */
const mapTexts = (notification: NotificationT, dayName: string): NotificationTextsT => {
  const { texts } = notification;
  let dayCode = getDayCode(dayName);
  if (dayCode === 0) {
    // workaround for weekend: sunday and saturday has 0,6 -> same modulo
    dayCode = 1;
  }
  const dayIndex = dayCode % texts.length;
  return {
    title: i18n.t(`notifications:${notification.texts[dayIndex].title}`),
    body: i18n.t(`notifications:${notification.texts[dayIndex].body}`),
  };
};

/**
 * assign text
 * @param notification
 */
const handleUpdate = (notification: NotificationT) => {
  removeNotification(notification); // cancel notification with old data if it wasn't canceled before
  if (notification.checked) {
    scheduleNotificationSettings(notification);
  }
};

const handleCreate = (notification: NotificationT) => {
  if (!notification.checked) {
    firebase.crashlytics().setAttribute('error-type', 'notifications');
    firebase
      .crashlytics()
      .log(
        'error-message: attempt to create notification and checked is set to false' +
          notification.id,
      );
    firebase.crashlytics().recordError(new Error());
    return; // silently skip: do not schedule notifications that are not checked
  }
  removeNotification(notification); //in any case it was there and wasn't removed before
  scheduleNotificationSettings(notification);
};

export const handleNotificationSchedule: Middleware<{}, RootStateType> = () => {
  return next => {
    return action => {
      const result = next(action);
      switch (action.type) {
        case getType(createNotificationSettings): {
          handleCreate(action.payload);
          break;
        }
        case getType(updateNotification): {
          handleUpdate(action.payload);
          break;
        }
        case getType(deleteNotificationSettings): {
          removeNotification(action.payload);
          break;
        }
        case getType(initNotificationSettings): {
          const initialNotifications: NotificationT[] = action.payload;
          initialNotifications.forEach(n => {
            if (n.checked) {
              handleCreate(n);
            }
          });
          break;
        }
        case getType(setDailyPlannedInhalations): {
          const toUpdates = notificationUpdatesForChangeInhalationPlan(action.payload);
          toUpdates.forEach((toUpdate: NotificationT) => handleUpdate(toUpdate));
          break;
        }
        case getType(importAndroidUserData): {
          (action.payload?.notificationSettings?.notifications ?? []).forEach(handleUpdate);
          break;
        }
        default:
          return result;
      }
      return result; //pass events to other middleware
    };
  };
};
