import firebase from '@react-native-firebase/app';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

import { RootStateType } from '../reducers/rootReducers';
import { GenderT, UserT } from '../types/user';
import { formatDate } from '../utils/formatDate';
import { getAgeFromBirthdate } from '../utils/getAgeFromBirthdate';
import {
  ANALYTICS_VERSION,
  NO_CLINICAL_ID,
  UP_ANALYTICS_VERSION,
  UP_BIRTH_DATE,
  UP_CLINICAL_TRIAL,
  UP_GENDER,
  UP_IS_TESTER,
  UP_PLATFORM,
} from '../utils/googleEvents';

/**
 * android analytics was before, use their names
 * @param gender
 */
const mapUserGender = (gender: GenderT.MALE | GenderT.FEMALE): string => {
  return gender === GenderT.MALE ? 'boy' : 'girl';
};

export const useFirebaseUserStateInit = (): void => {
  const user = useSelector<RootStateType, UserT | null>(state => state.user);

  useEffect(() => {
    if (user && user.gender) {
      firebase.analytics().setUserProperty(UP_GENDER, mapUserGender(user.gender)); //user gender
    }
    if (user && user.name) {
      firebase
        .analytics()
        .setUserProperty(UP_IS_TESTER, `${user.name.toLowerCase().startsWith('test')}`);
    }
    if (user && user.birthdate) {
      const { year, month, day } = user.birthdate;
      if (year && month && day) {
        firebase
          .analytics()
          .setUserProperty(UP_BIRTH_DATE, `${formatDate(user.birthdate, 'dd/MM/yyyy')}`); //birth date format dd/MM/yyyy
        firebase
          .analytics()
          .setUserProperty('u_a_a', `${getAgeFromBirthdate(new Date(year, month, day))}`); //user actual age in time of event report, caluclated
      }
    }
    firebase.analytics().setUserProperty(UP_ANALYTICS_VERSION, ANALYTICS_VERSION);
    firebase.analytics().setUserProperty(UP_PLATFORM, Platform.OS);
    firebase
      .analytics()
      .setUserProperty(
        UP_CLINICAL_TRIAL,
        user?.clinicalTrialId ? user.clinicalTrialId : NO_CLINICAL_ID,
      );
  }, [user]); // similar to componentDidMount, only executing on the first rendering or on arguments change.
};
