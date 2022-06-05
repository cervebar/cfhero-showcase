import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { importAndroidUserData } from '../actions/application';
import { setDailyPlannedInhalations } from '../actions/inhalation';
import {
  createNotificationSettings,
  deleteNotificationSettings,
  initNotificationSettings,
  updateAdhocNotificationSettingsChecked,
  updateNotification,
} from '../actions/notifications';
import { RootActions } from '../actions/rootActions';
import {
  NotificationT,
  NotificationsSettingsStateT,
  UpdateCheckedNotificationT,
  notificationInitialState,
} from '../types/notifications';
import {
  notificationUpdatesForChangeInhalationPlan,
  updateOneInNotifications,
  updateWithCheckedValue,
} from '../utils/notifications';

const handleCreateNotification = (
  state: NotificationsSettingsStateT,
  toCreateNotification: NotificationT,
): NotificationsSettingsStateT => {
  return <NotificationsSettingsStateT>{
    ...state,
    notifications: state.notifications.concat(toCreateNotification),
  };
};

const handleUpdate = (
  state: NotificationsSettingsStateT,
  toUpdate: NotificationT,
): NotificationsSettingsStateT => {
  return <NotificationsSettingsStateT>{
    ...state,
    notifications: updateOneInNotifications(state.notifications, toUpdate),
  };
};

const handleDeleteNotification = (
  state: NotificationsSettingsStateT,
  toDeleteNotification: NotificationT,
): NotificationsSettingsStateT => {
  const updatedNotifications = state.notifications.filter(
    notification => notification.id !== toDeleteNotification.id,
  );
  return {
    ...state,
    notifications: updatedNotifications,
  };
};

const handleUpdateAdhocNotification = (
  state: NotificationsSettingsStateT,
  toUpdate: UpdateCheckedNotificationT,
): NotificationsSettingsStateT => {
  const updatedNotifications = state.adHocNotifications.map(
    originalNotification =>
      originalNotification.id === toUpdate.id
        ? {
            id: toUpdate.id,
            checked: toUpdate.checked,
          }
        : originalNotification, // replace with new content or keep as is
  );
  return {
    ...state,
    adHocNotifications: updatedNotifications,
  };
};

const handleChangeDailyInhalationsCount = (
  state: NotificationsSettingsStateT,
  inhalationsCount: number,
): NotificationsSettingsStateT => {
  let updatedNotifications = state.notifications;
  const toUpdates: UpdateCheckedNotificationT[] =
    notificationUpdatesForChangeInhalationPlan(inhalationsCount);
  toUpdates.forEach(toUpdate => {
    updatedNotifications = updateWithCheckedValue(
      updatedNotifications,
      toUpdate.checked,
      toUpdate.id,
    );
  });
  return <NotificationsSettingsStateT>{
    ...state,
    notifications: updatedNotifications,
  };
};

export const notificationSettingsReducer: Reducer<NotificationsSettingsStateT, RootActions> = (
  state = notificationInitialState,
  action,
): NotificationsSettingsStateT => {
  switch (action.type) {
    case getType(createNotificationSettings): {
      return handleCreateNotification(state, action.payload);
    }
    case getType(updateNotification): {
      return handleUpdate(state, action.payload);
    }
    case getType(deleteNotificationSettings): {
      return handleDeleteNotification(state, action.payload);
    }
    case getType(updateAdhocNotificationSettingsChecked): {
      return handleUpdateAdhocNotification(state, action.payload);
    }
    case getType(initNotificationSettings): {
      const initialNotifications: NotificationT[] = action.payload;
      return {
        ...state,
        notifications: initialNotifications,
      };
    }
    case getType(setDailyPlannedInhalations):
      return handleChangeDailyInhalationsCount(state, action.payload);
    case getType(importAndroidUserData):
      return action.payload.notificationSettings;
    default:
      return state;
  }
};
