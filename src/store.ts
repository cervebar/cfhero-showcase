import AsyncStorage from '@react-native-community/async-storage';
import deepmerge from 'deepmerge';
import { Reducer, Store, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { getType } from 'typesafe-actions';

import { replaceRootState } from './actions/application';
import { RootActions } from './actions/rootActions';
import { handleNotificationSchedule } from './middleware/handleNotificationSchedule';
import { migration } from './middleware/migration';
import syncWithFirestore from './middleware/syncWithFirestore';
import trackAnalyticsEvent from './middleware/trackAnalyticsEvent';
import updateBadges from './middleware/updateBadges';
import { updateLevelState } from './middleware/updateLevelState';
import { RootStateType, reducers } from './reducers/rootReducers';
import { DevStorage } from './utils/devStorage';

const isDev = process.env.NODE_ENV === 'development';

const persistConfig = {
  key: 'root',
  // we save state to dev AsyncStorage only when user(developer) hits the SaveDevStateButton
  storage: isDev ? DevStorage : AsyncStorage,
  stateReconciler: autoMergeLevel2,
  version: 0,
};

const persistedCombinedReducers = persistCombineReducers<RootStateType, RootActions>(
  persistConfig,
  reducers,
);

const overridingReducer: Reducer<RootStateType & PersistPartial, RootActions> = (state, action) => {
  if (getType(replaceRootState) === action.type) {
    const { state: newState, merge } = action.payload;
    return merge ? (state ? deepmerge(state, newState) : newState) : newState;
  }
  return persistedCombinedReducers(state, action);
};

const store: Store = createStore(
  overridingReducer,
  composeWithDevTools(
    applyMiddleware(
      migration,
      syncWithFirestore,
      updateBadges,
      updateLevelState,
      trackAnalyticsEvent,
      handleNotificationSchedule,
    ),
  ),
);

export default store;
export const persistor = persistStore(store);
