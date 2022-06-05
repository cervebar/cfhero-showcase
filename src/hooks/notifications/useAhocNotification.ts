import { AdHocNotificationIdT } from '../../types/notifications';
import useMyState from '../useMyState';

export default function useAdHocNotification(id: AdHocNotificationIdT) {
  const adHocNotifications = useMyState(state => state.notificationSettings.adHocNotifications);
  return adHocNotifications.find(n => n.id === id)?.checked ?? false;
}
