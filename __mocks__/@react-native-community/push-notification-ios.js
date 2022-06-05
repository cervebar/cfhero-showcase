const mockPushNotificationsIos = {
  localNotification: jest.fn(),
  scheduleLocalNotification: jest.fn(),
  requestPermissions: jest.fn(),
};

export default mockPushNotificationsIos;
