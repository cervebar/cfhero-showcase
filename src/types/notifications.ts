import { NotificationTypeT } from '../hooks/notifications/createNotificationType';
import { WEEKEND, WEEK_DAYS } from './days';

export const SYSTEM_TYPE = 'system';
export const CUSTOM_TYPE = 'custom';

export const WORKDAYS_CATEGORY = 'workdays';
export const WEEKEND_CATEGORY = 'weekend';

export const NOTIFICATION_INHALATION_PAUSED_IN_BACKGROUND =
  'NOTIFICATION_INHALATION_PAUSED_IN_BACKGROUND';
export const NOTIFICATION_INHALATION_IN_BACKGROUND = 'NOTIFICATION_INHALATION_IN_BACKGROUND';
export const NOTIFICATION_FLUTTERING_PAUSED_IN_BACKGROUND =
  'NOTIFICATION_FLUTTERING_PAUSED_IN_BACKGROUND';
export const NOTIFICATION_FLUTTERING_IN_BACKGROUND = 'NOTIFICATION_FLUTTERING_IN_BACKGROUND';

export const TIPS_TRICKS = 'TIPS_TRICKS';
export const ADHOC_PLAN_FULFILLMENT = 'ADHOC_PLAN_FULLFILMENT';

export type AdHocNotificationIdT = typeof ADHOC_PLAN_FULFILLMENT;

export const NOTIFICATION_MORNING_WORK_DAY = 'NOTIFICATION_MORNING_WORK_DAY';
export const NOTIFICATION_AFTERNOON_WORK_DAY = 'NOTIFICATION_AFTERNOON_WORK_DAY';
export const NOTIFICATION_EVENING_WORK_DAY = 'NOTIFICATION_EVENING_WORK_DAY';
export const NOTIFICATION_AFTERNOON_WEEKEND = 'NOTIFICATION_AFTERNOON_WEEKEND';
export const NOTIFICATION_EVENING_WEEKEND = 'NOTIFICATION_EVENING_WEEKEND';
export const NOTIFICATION_MORNING_WEEKEND = 'NOTIFICATION_MORNING_WEEKEND';

export enum NotificationRoute {
  INHALATION_SETUP_ROUTE = 'inhalation_setup_route',
  FLUTTERING_SETUP_ROUTE = 'fluttering_setup_route',
  HOMESCREEN_ROUTE = 'homescreen_route',
  SETTINGS_NOTIFICATIONS = 'settings_notifications',
}

export enum NotificationHandler {
  USE_NOTIFICATION_CLICKED_HANDLER = 'useNotificationClickedHandler',
}

export type NotificationMetadataT = NotificationTypeT & {
  notificationId: string;
  handler: NotificationHandler;
  route: NotificationRoute;
};

export type AdHocNotificationInfoT = {
  id: string;
  hour: number;
  minute: number;
  checked?: boolean;
};

export type NotificationT = {
  id: string;
  name: string; // name shown in notification settings screen
  type: string;
  texts: NotificationTextsT[]; //if type is custom => this text exactly, else system => handled by other logic
  category: string;
  hour: number;
  minute: number;
  checked: boolean;
  repeating: string[];
  route: NotificationRoute;
};

export type NotificationTextsT = {
  title: string;
  body: string;
};

export type AdHocNotificationT = {
  id: AdHocNotificationIdT;
  checked: boolean;
};
export type UpdateCheckedNotificationT = {
  id: string;
  checked: boolean;
};

export type NotificationsSettingsStateT = {
  notifications: NotificationT[];
  adHocNotifications: AdHocNotificationT[];
};

export type TimeModalDataT = {
  minute: number;
  hour: number;
  visible: boolean;
};

export type CreateNotificationT = {
  name: string;
  type: string;
  category: string;
  hour: number;
  minute: number;
  checked: boolean;
  repeating: string[];
};

export const AFTERNOON_WORK_DAY = {
  id: NOTIFICATION_AFTERNOON_WORK_DAY,
  type: SYSTEM_TYPE,
  name: 'afternoonNotification',
  texts: [
    { title: 'afternoonNotificationWorkDayTitle_1', body: 'afternoonNotificationWorkDayBody_1' },
    { title: 'afternoonNotificationWorkDayTitle_2', body: 'afternoonNotificationWorkDayBody_2' },
    { title: 'afternoonNotificationWorkDayTitle_3', body: 'afternoonNotificationWorkDayBody_3' },
  ],
  category: WORKDAYS_CATEGORY,
  hour: 15,
  minute: 30,
  checked: true,
  repeating: WEEK_DAYS,
  route: NotificationRoute.INHALATION_SETUP_ROUTE,
};

export const EVENING_WORK_DAY = {
  id: NOTIFICATION_EVENING_WORK_DAY,
  type: SYSTEM_TYPE,
  name: 'eveningNotification',
  texts: [
    { title: 'eveningNotificationWorkDayTitle_1', body: 'eveningNotificationWorkDayBody_1' },
    { title: 'eveningNotificationWorkDayTitle_2', body: 'eveningNotificationWorkDayBody_2' },
    { title: 'eveningNotificationWorkDayTitle_3', body: 'eveningNotificationWorkDayBody_3' },
  ],
  category: WORKDAYS_CATEGORY,
  hour: 20,
  minute: 0,
  checked: true,
  repeating: WEEK_DAYS,
  route: NotificationRoute.INHALATION_SETUP_ROUTE,
};

export const AFTERNOON_WEEKEND = {
  id: NOTIFICATION_AFTERNOON_WEEKEND,
  type: SYSTEM_TYPE,
  name: 'afternoonNotification',
  category: WEEKEND_CATEGORY,
  hour: 14,
  texts: [
    { title: 'afternoonNotificationWeekendTitle_2', body: 'afternoonNotificationWeekendBody_2' },
    { title: 'afternoonNotificationWeekendTitle_3', body: 'afternoonNotificationWeekendBody_3' },
    { title: 'afternoonNotificationWeekendTitle_1', body: 'afternoonNotificationWeekendBody_1' }, //warn: not used
  ],
  minute: 0,
  checked: true,
  repeating: WEEKEND,
  route: NotificationRoute.INHALATION_SETUP_ROUTE,
};

export const EVENING_WEEKEND = {
  id: NOTIFICATION_EVENING_WEEKEND,
  type: SYSTEM_TYPE,
  name: 'eveningNotification',
  texts: [
    { title: 'eveningNotificationWeekendTitle_2', body: 'eveningNotificationWeekendBody_2' },
    { title: 'eveningNotificationWeekendTitle_3', body: 'eveningNotificationWeekendBody_3' },
    { title: 'eveningNotificationWeekendTitle_1', body: 'eveningNotificationWeekendBody_1' }, //warn: not used
  ],
  category: WEEKEND_CATEGORY,
  hour: 20,
  minute: 0,
  checked: true,
  repeating: WEEKEND,
  route: NotificationRoute.INHALATION_SETUP_ROUTE,
};

export const notificationInitialState: NotificationsSettingsStateT = {
  adHocNotifications: [
    {
      id: ADHOC_PLAN_FULFILLMENT,
      checked: true,
    },
  ],
  notifications: [
    {
      id: NOTIFICATION_MORNING_WORK_DAY,
      type: SYSTEM_TYPE,
      name: 'morningNotification',
      texts: [
        { title: 'morningNotificationWeekDayTitle_1', body: 'morningNotificationWeekDayBody_1' },
        { title: 'morningNotificationWeekDayTitle_2', body: 'morningNotificationWeekDayBody_2' },
        { title: 'morningNotificationWeekDayTitle_3', body: 'morningNotificationWeekDayBody_3' },
      ],
      category: WORKDAYS_CATEGORY,
      hour: 9,
      minute: 0,
      checked: true,
      repeating: WEEK_DAYS,
      route: NotificationRoute.INHALATION_SETUP_ROUTE,
    },
    AFTERNOON_WORK_DAY,
    EVENING_WORK_DAY,
    {
      id: NOTIFICATION_MORNING_WEEKEND,
      type: SYSTEM_TYPE,
      name: 'morningNotification',
      texts: [
        { title: 'morningNotificationWeekendTitle_2', body: 'morningNotificationWeekendBody_2' },
        { title: 'morningNotificationWeekendTitle_3', body: 'morningNotificationWeekendBody_3' },
        { title: 'morningNotificationWeekendTitle_1', body: 'morningNotificationWeekendBody_1' }, //warn: not used
      ],
      category: WEEKEND_CATEGORY,
      hour: 9,
      minute: 0,
      checked: true,
      repeating: WEEKEND,
      route: NotificationRoute.INHALATION_SETUP_ROUTE,
    },
    AFTERNOON_WEEKEND,
    EVENING_WEEKEND,
  ],
};
