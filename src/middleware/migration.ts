import notifee from '@notifee/react-native';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { getType } from 'typesafe-actions';

import { forceMigrations } from '../actions/application';
import { dbMigration0to1, dbMigration1to2, dbMigration2to3 } from '../actions/dbMigration';
import { initNotificationSettings } from '../actions/notifications';
import useMyState from '../hooks/useMyState';
import { prepareBadgesFromVerion0To1 } from '../reducers/dbmigrations/badge';
import { RootStateType } from '../reducers/rootReducers';
import {
  INITIAL_GOTO_NOTIFICATIONS_REMINDER_NOTIFICATION,
  getInitialNotificationValues,
} from '../utils/notifications';
import { scheduleNotification } from '../utils/scheduleNotification';

const LATEST_VERSION = 3;

export const useIsDatabaseVersionCorrect = () => {
  const dispatch = useDispatch();
  const block = useRef(false);
  const correct = useMyState(state => state.dbversion.version) >= LATEST_VERSION;

  if (!correct && !block.current) {
    dispatch(forceMigrations());
    block.current = true;
  }

  if (correct) {
    block.current = false;
  }

  return correct;
};

const version3Migration = (store: MiddlewareAPI<Dispatch, RootStateType>) => {
  const state = store.getState();
  store.dispatch(
    dbMigration2to3({
      version: 3,
      description:
        '3rd version, release 1.4.0, set version updates as not seen for current users, badges, 9.9.2021',
      state,
    }),
  );
};

const version2Migration = async (store: MiddlewareAPI<Dispatch, RootStateType>) => {
  store.dispatch(
    dbMigration1to2({
      version: 2,
      description: '2nd version, release 1.3.0, added notifications, badges, 1.6.2021',
    }),
  );
  // cancel all previous notifications
  return notifee.cancelAllNotifications().then(async () => {
    await scheduleNotification(INITIAL_GOTO_NOTIFICATIONS_REMINDER_NOTIFICATION);
    store.dispatch(
      initNotificationSettings(
        // @ts-ignore
        getInitialNotificationValues(
          store.getState().user.birthdate,
          store.getState().inhalation.dailyPlannedInhalations,
        ),
      ),
    );
  });
};

export const migration: Middleware<{}, RootStateType> = store => next => {
  return action => {
    const result = next(action);
    if (action.type !== getType(forceMigrations)) {
      return result;
    }
    const state = store.getState();

    let nextVersion = state.dbversion.version;
    while (nextVersion < LATEST_VERSION) {
      nextVersion = nextVersion + 1;
      if (nextVersion === 1) {
        store.dispatch(
          dbMigration0to1({
            version: 1,
            description: '1st version, added versioning and fixed badges, 10.2.2021',
            badges0to1: prepareBadgesFromVerion0To1(state),
          }),
        );
      }
      if (nextVersion === 2) {
        version2Migration(store);
      }
      if (nextVersion === 3) {
        version3Migration(store);
      }
    }
    return result;
  };
};
