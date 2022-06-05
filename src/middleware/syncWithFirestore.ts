import firebase from '@react-native-firebase/app';
import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';

import { copyStateFromFirebase, replaceRootState } from '../actions/application';
import { RootStateType } from '../reducers/rootReducers';
import { generateUserId } from '../utils/userId';

const FIRESTORE_COLLECTION_NAME = 'users-state';

const whitelistStateProperties = (state: RootStateType) => {
  const {
    dbversion,
    application: {
      firstLaunchDate,
      counterApplicationLaunched,
      seasonalTheme,
      showStreakStrategyChangeInfo,
      streakStrategyChangeInfoSeen,
      versionUpdates,
      cheatsOn,
    },
    user,
    balance,
    store,
    comicShop,
    inhalation,
    inhalator,
    flutter,
    avatar,
    level,
    badge: { achievedBadges, available, badgeLevels, owned },
    medicine,
    modalMessage: { received },
    fluttering,
    notificationSettings: { notifications, adHocNotifications },
  } = state;

  return {
    dbversion,
    application: {
      firstLaunchDate,
      counterApplicationLaunched,
      seasonalTheme,
      showStreakStrategyChangeInfo,
      streakStrategyChangeInfoSeen,
      versionUpdates,
      cheatsOn,
    },
    user,
    balance,
    store,
    comicShop,
    inhalation,
    inhalator,
    flutter,
    avatar,
    level,
    badge: { achievedBadges, available, badgeLevels, owned },
    medicine,
    modalMessage: { received },
    fluttering,
    notificationSettings: { notifications, adHocNotifications },
  };
};

const copyFromUser = (id: string, merge: boolean, dispatch: (data: any) => void) => {
  firebase.crashlytics().setUserId(id);
  const collection = firebase.firestore().collection(FIRESTORE_COLLECTION_NAME);
  collection
    .doc(id)
    .get({
      source: 'server',
    })
    .then(data => {
      const state = data.data();
      if (!state) return;

      const generatedUserId = generateUserId();
      firebase.crashlytics().setUserId(generatedUserId);
      state.user.id = generatedUserId;

      console.log(state);
      dispatch(replaceRootState({ state, merge }));
    })
    .catch(err => console.error(err));
};

const syncWithFirestore: Middleware<{}, RootStateType> = store => next => action => {
  if (action.type === getType(copyStateFromFirebase)) {
    const result = next(action);
    copyFromUser(action.payload.id, action.payload.merge, a => store.dispatch(a));
    return result;
  }

  const result = next(action);
  if (!action.meta || !action.meta.sync) {
    return result;
  }
  const state = store.getState();
  const whitelistedProps = whitelistStateProperties(state);

  if (state.user.dataCollectionEnabled && state.user.id) {
    const collection = firebase.firestore().collection(FIRESTORE_COLLECTION_NAME);
    const userId = state.user.id;

    collection
      .doc(userId)
      .set(whitelistedProps)
      .catch(err => {
        // handle error
        console.error('firebase error ', err);
      });
  }

  return result;
};

export default syncWithFirestore;
