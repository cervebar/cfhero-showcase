export type NotificationTypeT = {
  notificationType: string;
};

export const createNotificationType = (notificationType: string): NotificationTypeT => ({
  notificationType,
});
