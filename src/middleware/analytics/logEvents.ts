import firebase from '@react-native-firebase/app';
import Config from 'react-native-config';

import { GenderT } from '../../types/user';
import { ANALYTICS_EVENT_USER_PATH } from '../../utils/googleEvents';

const isDebugEnv = Config.NODE_ENV === 'development';

export const logUserPath = (eventName: string): void => {
  logAnalyticsData(ANALYTICS_EVENT_USER_PATH, { e_n: eventName });
};

export const logAnalyticsData = (eventId: string, params: { [key: string]: any }): void => {
  try {
    firebase.analytics().logEvent(eventId, params);
    if (isDebugEnv) {
      console.log('event:' + eventId + ', data: ' + JSON.stringify(params));
    }
  } catch (error) {
    console.error(error);
  }
};

export const logFromActionDirectly = (action: any): void => {
  try {
    if (action.meta.params) {
      firebase.analytics().logEvent(action.meta.event, action.meta.params);
      if (isDebugEnv) {
        console.log('event:' + action.meta.event + ', data: ' + JSON.stringify(action.meta.params));
      }
    }
  } catch (error) {
    console.error(error);
  }
};
