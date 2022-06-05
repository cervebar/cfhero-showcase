import { StateType } from 'typesafe-actions';

import applicationReducer from './application';
import avatarReducer from './avatar';
import badgeReducer from './badges/badge';
import { badgesChecksReducer } from './badges/badgesChecks';
import balanceReducer from './balance';
import comicShopReducer from './comicShop';
import { dbVersionReducer } from './dbversion';
import flutterReducer from './flutter';
import flutteringReducer from './fluttering';
import inhalationReducer from './inhalation';
import inhalatorReducer from './inhalator';
import levelReducer from './level';
import medicineReducer from './medicine';
import { modalMessageReducer } from './modalMessage';
import { notificationSettingsReducer } from './notificationsSettings';
import storeReducer from './store';
import streakReducer from './streak';
import userReducer from './user';

export const reducers = {
  dbversion: dbVersionReducer,
  application: applicationReducer,
  user: userReducer,
  balance: balanceReducer,
  store: storeReducer,
  comicShop: comicShopReducer,
  inhalation: inhalationReducer,
  inhalator: inhalatorReducer,
  flutter: flutterReducer,
  avatar: avatarReducer,
  level: levelReducer,
  streak: streakReducer,
  badge: badgeReducer,
  badgesChecks: badgesChecksReducer,
  modalMessage: modalMessageReducer,
  medicine: medicineReducer,
  fluttering: flutteringReducer,
  notificationSettings: notificationSettingsReducer,
};

export type RootStateType = StateType<typeof reducers>;
