import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';

import { receiveBadge } from '../actions/badge';
import { buyComic } from '../actions/comicShop';
import {
  addCompletedFluttering,
  setFlutteringPatternIndex,
  setFlutteringPdvVisited,
} from '../actions/fluttering';
import {
  addCompletedInhalation,
  setDailyPlannedInhalations,
  setInhalationPatternIndex,
  setInhalationPdvVisited,
} from '../actions/inhalation';
import { hideModalMessageModal, logReceiveModalMessage } from '../actions/modalMessage';
import {
  createNotificationSettings,
  deleteNotificationSettings,
  initNotificationSettings,
  trackAdHocNotificationCreated,
  updateAdhocNotificationSettingsChecked,
  updateNotification,
} from '../actions/notifications';
import { buyItem } from '../actions/store';
import {
  trackAgreement,
  trackAgreementParent,
  trackBadgeAnalytics,
  trackComicReaderVisited,
  trackLevelUpdate,
  trackNotificationRead,
  trackScenarioFinished,
  trackSingleEvent,
  trackStartSessionEvent,
  trackUserPath,
} from '../actions/tracking';
import {
  setClinicalTrialId,
  setFirstTimeUsage,
  setUserBirthdateWithYear,
  setUserInfo,
} from '../actions/user';
import { RootStateType } from '../reducers/rootReducers';
import { SessionResolutionState } from '../types/session';
import {
  ANALYTICS_CLINICAL_TRIAL,
  ANALYTICS_CONTEXT_FLUTTERING,
  ANALYTICS_CONTEXT_INHALATION,
  ANALYTICS_ONBOARDING_COMPLETED,
  ANALYTICS_PDV_CLICKED_EVENT,
  ANALYTICS_UP_FLUTTERING_PDV_CLICKED,
  ANALYTICS_UP_INHALATION_PDV_CLICKED,
  ANALYTICS_UP_LEVEL_UP,
} from '../utils/googleEvents';
import { logBadge } from './analytics/badges';
import { logBuyComicsEvent, logScenarioFinished, logScenarioView } from './analytics/comics';
import {
  logFlutteringFailed,
  logFlutteringFinished,
  logStartFluttering,
} from './analytics/fluttering';
import {
  logInhalationFailed,
  logReportInhalation,
  logStartInhalation,
} from './analytics/inhalation';
import { logAnalyticsData, logFromActionDirectly, logUserPath } from './analytics/logEvents';
import { logModalMessageAction, logReceiveModalMessageData } from './analytics/modalMessages';
import {
  logAdHocNotificationCreated,
  logAdHocNotificationUpdated,
  logDeleteNotification,
  logInitNotification,
  logNotificationCreated,
  logNotificationRead,
  logNotificationUpdate,
} from './analytics/notifications';
import { logUserInfo } from './analytics/onboarding';
import {
  logPDVUpdateFluttering,
  logPDVUpdateInhalation,
  logSettingsChangeBirthday,
  logSettingsChangeInhalationsCount,
  logUserFromSettingsInfo,
} from './analytics/settings';
import { logBuyItem } from './analytics/store';

const trackGoogleEvent: Middleware<{}, RootStateType> = store => {
  return next => {
    return action => {
      const result = next(action);
      const state = store.getState();
      switch (action.type) {
        case getType(addCompletedInhalation): {
          if (action.payload.resolutionState === SessionResolutionState.ok) {
            logReportInhalation(action.payload, state);
          } else {
            logInhalationFailed(action.payload);
          }
          break;
        }
        case getType(addCompletedFluttering): {
          if (action.payload.resolutionState === SessionResolutionState.ok) {
            logFlutteringFinished(action.payload, state);
          } else {
            logFlutteringFailed(action.payload);
          }
          break;
        }
        case getType(setInhalationPdvVisited): {
          if (action.payload === true) {
            logUserPath(ANALYTICS_UP_INHALATION_PDV_CLICKED);
            logAnalyticsData(ANALYTICS_PDV_CLICKED_EVENT, { ctx: ANALYTICS_CONTEXT_INHALATION });
          }
          break;
        }
        case getType(setFlutteringPdvVisited): {
          if (action.payload === true) {
            logUserPath(ANALYTICS_UP_FLUTTERING_PDV_CLICKED);
            logAnalyticsData(ANALYTICS_PDV_CLICKED_EVENT, { ctx: ANALYTICS_CONTEXT_FLUTTERING });
          }
          break;
        }
        case getType(trackStartSessionEvent): {
          if (action.payload.isFluttering === true) {
            logStartFluttering(action.payload, state);
          } else {
            logStartInhalation(action.payload, state);
          }
          break;
        }
        case getType(trackNotificationRead): {
          logNotificationRead(action.payload);
          break;
        }
        case getType(trackLevelUpdate): {
          logUserPath(ANALYTICS_UP_LEVEL_UP);
          logFromActionDirectly(action);
          break;
        }
        case getType(setFirstTimeUsage): {
          logUserPath(ANALYTICS_ONBOARDING_COMPLETED);
          logUserInfo(state.user);
          break;
        }
        // settings updates
        case getType(setUserInfo): {
          logUserFromSettingsInfo(action.payload, state);
          break;
        }
        case getType(setUserBirthdateWithYear): {
          logSettingsChangeBirthday(action.payload, state);
          break;
        }
        case getType(setDailyPlannedInhalations): {
          logSettingsChangeInhalationsCount(action.payload, state);
          break;
        }
        case getType(logReceiveModalMessage): {
          logReceiveModalMessageData(action.payload);
          break;
        }
        case getType(hideModalMessageModal): {
          logModalMessageAction(action.payload);
          break;
        }
        case getType(setInhalationPatternIndex): {
          logPDVUpdateInhalation(action.payload, state);
          break;
        }
        case getType(setFlutteringPatternIndex): {
          logPDVUpdateFluttering(action.payload, state);
          break;
        }
        case getType(buyComic): {
          logBuyComicsEvent(action.payload);
          break;
        }
        case getType(trackComicReaderVisited): {
          logScenarioView(action.payload);
          break;
        }
        case getType(trackScenarioFinished): {
          logScenarioFinished(action.payload);
          break;
        }
        case getType(buyItem): {
          logBuyItem(action.payload);
          break;
        }
        case getType(receiveBadge): {
          logBadge(action.payload);
          break;
        }
        case getType(createNotificationSettings): {
          logNotificationCreated(action.payload);
          break;
        }
        case getType(updateNotification): {
          logNotificationUpdate(action.payload);
          break;
        }
        case getType(deleteNotificationSettings): {
          logDeleteNotification(action.payload);
          break;
        }
        case getType(initNotificationSettings): {
          logInitNotification(action.payload);
          break;
        }
        case getType(trackAdHocNotificationCreated): {
          logAdHocNotificationCreated(action.payload);
          break;
        }
        case getType(updateAdhocNotificationSettingsChecked): {
          logAdHocNotificationUpdated(action.payload);
          break;
        }
        case getType(setClinicalTrialId): {
          logAnalyticsData(ANALYTICS_CLINICAL_TRIAL, { clinicalTrialID: action.payload });
          break;
        }
        // log these events directly from action data, this actions are done only for the tracking
        case getType(trackSingleEvent):
        case getType(trackUserPath):
        case getType(trackAgreement):
        case getType(trackBadgeAnalytics):
        case getType(trackAgreementParent): {
          logFromActionDirectly(action);
          break;
        }
        default:
          return result;
      }
      return result; //pass events to other middleware
    };
  };
};

export default trackGoogleEvent;
