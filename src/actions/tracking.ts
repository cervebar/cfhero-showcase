import { ActionType } from 'typesafe-actions';

import {
  ANALYTICS_EMPTY_PARAMS,
  BADGE_PARAMS_IN_T,
  BADGE_PARAMS_T,
  ComicsAnalyticsDataT,
  DATA_COLLECTION_AGREEMENT_FIREBASE_T,
  DATA_COLLECTION_AGREEMENT_T,
  FIREBASE_ANALYTICS_LEVEL_UP_T,
  FIREBASE_ANALYTICS_USER_PATH_T,
  GOOGLE_EVENT_META_CATEGORYVIEWED_T,
  GOOGLE_EVENT_META_ITEMCHANGED_T,
  GOOGLE_EVENT_META_ITEMVIEWED_T,
  GoogleMetaT,
  ReadNotificationEventT,
  StartInhalationEventT,
} from '../types/tracking';
import { createSyncedAction, payloadCreator } from '../utils/createSyncedAction';
import {
  ANALYTICS_EVENT_USER_PATH,
  ANALYTICS_LEVEL_UP,
  ANALYTICS_ONBOARDING_AGGREEMENT_EVENT,
  ANALYTICS_ONBOARDING_PARENT_AGGREEMENT_EVENT,
  GOOGLE_EVENT_CATEGORYVIEWED,
  GOOGLE_EVENT_ITEMCHANGED,
  GOOGLE_EVENT_ITEMVIEWED,
  NOTIFICATION_READ,
} from '../utils/googleEvents';

export const trackUserPath = createSyncedAction<
  '@tracking/ANALYTICS_EVENT_USER_PATH',
  string,
  GoogleMetaT<FIREBASE_ANALYTICS_USER_PATH_T>
>('@tracking/ANALYTICS_EVENT_USER_PATH', payloadCreator, eventName => ({
  event: ANALYTICS_EVENT_USER_PATH,
  params: {
    e_n: eventName,
  },
}))();

export const trackSingleEvent = createSyncedAction<
  '@tracking/ANALYTICS_TRACK_SINGLE_EVENT',
  string,
  GoogleMetaT<ANALYTICS_EMPTY_PARAMS>
>('@tracking/ANALYTICS_TRACK_SINGLE_EVENT', payloadCreator, eventName => ({
  event: eventName,
  params: {},
}))();

export const trackStartSessionEvent = createSyncedAction<
  '@tracking/TRACK_START_INHALATION',
  StartInhalationEventT
>('@tracking/TRACK_START_INHALATION')();

export const trackLevelUpdate = createSyncedAction<
  '@tracking/ANALYTICS_LEVEL_UP',
  FIREBASE_ANALYTICS_LEVEL_UP_T,
  GoogleMetaT<FIREBASE_ANALYTICS_LEVEL_UP_T>
>('@tracking/ANALYTICS_LEVEL_UP', payloadCreator, ({ lvl, days }) => ({
  event: ANALYTICS_LEVEL_UP,
  params: {
    lvl,
    days,
  },
}))();

export const trackBadgeAnalytics = createSyncedAction<
  '@tracking/ANALYTICS_BADGE_NOT_ACHIEVED_CLICK',
  BADGE_PARAMS_IN_T,
  GoogleMetaT<BADGE_PARAMS_T>
>('@tracking/ANALYTICS_BADGE_NOT_ACHIEVED_CLICK', payloadCreator, ({ eventName, badgeId }) => ({
  event: eventName,
  params: {
    badgeId,
  },
}))();

export const trackScenarioFinished = createSyncedAction<
  '@tracking/SCENARIO_FINISHED_EVENT',
  ComicsAnalyticsDataT
>('@tracking/SCENARIO_FINISHED_EVENT')();

export const trackAgreementParent = createSyncedAction<
  '@tracking/TRACK_ONBOARDING_PARENT_AGGREEMENT_EVENT',
  DATA_COLLECTION_AGREEMENT_T,
  GoogleMetaT<DATA_COLLECTION_AGREEMENT_FIREBASE_T>
>(
  '@tracking/TRACK_ONBOARDING_PARENT_AGGREEMENT_EVENT',
  payloadCreator,
  ({ dataCollectionAgreement, contactAgreementPermission }) => ({
    event: ANALYTICS_ONBOARDING_PARENT_AGGREEMENT_EVENT,
    params: {
      d_c_a: dataCollectionAgreement,
      con_a: contactAgreementPermission,
    },
  }),
)();

export const trackAgreement = createSyncedAction<
  '@tracking/TRACK_ONBOARDING_AGGREEMENT_EVENT',
  DATA_COLLECTION_AGREEMENT_T,
  GoogleMetaT<DATA_COLLECTION_AGREEMENT_FIREBASE_T>
>(
  '@tracking/TRACK_ONBOARDING_AGGREEMENT_EVENT',
  payloadCreator,
  ({ dataCollectionAgreement, contactAgreementPermission }) => ({
    event: ANALYTICS_ONBOARDING_AGGREEMENT_EVENT,
    params: {
      d_c_a: dataCollectionAgreement,
      con_a: contactAgreementPermission,
    },
  }),
)();

export const trackStoreCategoryViewed = createSyncedAction<
  '@tracking/TRACK_STORE_CATEGORY_VIEWED',
  GOOGLE_EVENT_META_CATEGORYVIEWED_T,
  GoogleMetaT<GOOGLE_EVENT_META_CATEGORYVIEWED_T>
>('@tracking/TRACK_STORE_CATEGORY_VIEWED', payloadCreator, ({ Category }) => ({
  event: GOOGLE_EVENT_CATEGORYVIEWED,
  params: {
    Category,
  },
}))();

export const trackStoreItemViewed = createSyncedAction<
  '@tracking/TRACK_STORE_ITEM_VIEWED',
  GOOGLE_EVENT_META_ITEMVIEWED_T,
  GoogleMetaT<GOOGLE_EVENT_META_ITEMVIEWED_T>
>('@tracking/TRACK_STORE_ITEM_VIEWED', payloadCreator, ({ Category, Item }) => ({
  event: GOOGLE_EVENT_ITEMVIEWED,
  params: {
    Category,
    Item,
  },
}))();

export const trackStoreItemChanged = createSyncedAction<
  '@tracking/TRACK_STORE_ITEM_CHANGED',
  GOOGLE_EVENT_META_ITEMCHANGED_T,
  GoogleMetaT<GOOGLE_EVENT_META_ITEMCHANGED_T>
>('@tracking/TRACK_STORE_ITEM_CHANGED', payloadCreator, ({ From, To }) => ({
  event: GOOGLE_EVENT_ITEMCHANGED,
  params: {
    From,
    To,
  },
}))();

export const trackComicReaderVisited = createSyncedAction<
  '@tracking/TRACK_COMIC_READER_VISITED',
  ComicsAnalyticsDataT
>('@tracking/TRACK_COMIC_READER_VISITED')();

export const trackNotificationRead = createSyncedAction<
  '@tracking/NOTIFICATION_READ',
  ReadNotificationEventT,
  GoogleMetaT<ReadNotificationEventT>
>('@tracking/NOTIFICATION_READ', payloadCreator, ({ timestamp, id }) => ({
  event: NOTIFICATION_READ,
  params: {
    timestamp,
    id,
  },
}))();

export type TrackingActions = ActionType<
  | typeof trackStoreCategoryViewed
  | typeof trackStoreItemViewed
  | typeof trackStoreItemChanged
  | typeof trackComicReaderVisited
>;
