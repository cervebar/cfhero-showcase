import { ActionType } from 'typesafe-actions';

import {
  AdHocNotificationInfoT,
  NotificationT,
  UpdateCheckedNotificationT,
} from '../types/notifications';
import { createSyncedAction } from '../utils/createSyncedAction';

export const createNotificationSettings = createSyncedAction(
  '@notificationSettings/CREATE_NOTIFICATION',
)<NotificationT>();

export const updateNotification = createSyncedAction(
  '@notificationSettings/UPDATE_NOTIFICATION',
)<NotificationT>();

export const deleteNotificationSettings = createSyncedAction(
  '@notificationSettings/DELETE_NOTIFICATION',
)<NotificationT>();

export const updateAdhocNotificationSettingsChecked = createSyncedAction(
  '@notificationSettings/UPDATE_ADDHOC_NOTIFICATION',
)<UpdateCheckedNotificationT>();

export const initNotificationSettings = createSyncedAction<
  '@notificationSettings/INIT',
  NotificationT[]
>('@notificationSettings/INIT')();

export const trackAdHocNotificationCreated = createSyncedAction<
  '@notificationSettings/ADHOC_CREATED',
  AdHocNotificationInfoT
>('@notificationSettings/ADHOC_CREATED')();

export type NotificationSettingsActions = ActionType<
  | typeof createNotificationSettings
  | typeof updateNotification
  | typeof deleteNotificationSettings
  | typeof updateAdhocNotificationSettingsChecked
  | typeof initNotificationSettings
  | typeof trackAdHocNotificationCreated
>;
