import firebase from '@react-native-firebase/app';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { receiveModalMessage, removeModalMessage } from '../actions/modalMessage';
import { RootStateType } from '../reducers/rootReducers';
import { isContactAgreementEnabled, isOnboardingCompleted } from '../selectors/application';
import i18n from '../utils/i18n';

const onError = (error: any) => {
  console.error(error);
};

const compare = (a: string, operator: string, b: string) => {
  switch (operator) {
    case '==':
      return a === b;
    case '!=':
      return a !== b;
    case 'contains':
      return a.includes(b);
    case 'startsWith':
      return a.startsWith(b);
    case 'endsWith':
      return a.endsWith(b);
    default:
      // unknown operator, message might have been generated by a newer version
      return false;
  }
};

/**
 * Generic Number comparison method
 *
 * @param a first Number object
 * @param operator possible values are == != >= <= > <
 * @param b second Number object
 * @param <T> any object that extends Number and Comparable
 * @return returns true if "a operator b" is a truthy statement
 */
const numberCompare = (a: number, operator: string, b: number) => {
  switch (operator) {
    case '==':
      return a === b;
    case '!=':
      return a !== b;
    case '>=':
      return a >= b;
    case '<=':
      return a <= b;
    case '>':
      return a > b;
    case '<':
      return a < b;
    default:
      // unknown operator
      return false;
  }
};

// @ts-ignore
const checkConditions = (
  data: FirebaseFirestoreTypes.DocumentData,
  clinicalTrialId: string | undefined,
) => {
  if (!data.conditions) {
    return true; // if no condition then we assume it's modal message for all types/platforms
  }
  try {
    let conditionResult = true;
    // @ts-ignore
    data.conditions.forEach(({ attribute, operator, value }) => {
      switch (attribute) {
        case 'valid_from':
          const nowTimeInMillis1 = Math.round(new Date().getTime() / 1000);
          // we ignore operator here, it's simple if today is after valid_from
          if (!numberCompare(nowTimeInMillis1, '>', value * 1)) {
            conditionResult = false;
          }
          break;
        case 'valid_to':
          const nowTimeInMillis = Math.round(new Date().getTime() / 1000);
          // we ignore operator here, it's simple if today is before valid_to
          if (!numberCompare(nowTimeInMillis, '<', value * 1)) {
            conditionResult = false;
          }
          break;
        case 'platform':
          if (!compare(Platform.OS, operator, value)) {
            conditionResult = false;
          }
          break;
        case 'ios_version':
          const pkg = require('../../package.json');
          const versionCode = pkg.version;
          if (!compare(versionCode, operator, value)) {
            conditionResult = false;
          }
          break;
        case 'locale':
          const locale = i18n.language;
          if (!compare(locale, operator, value)) {
            conditionResult = false;
          }
          break;
        case 'clinical_trial':
          if (compare('only_clinical_trial', '==', value)) {
            if (clinicalTrialId === undefined || clinicalTrialId === '') {
              conditionResult = false;
            } //else it's ok, clinical trial id was assigned to this user
          } //else all its ok
          break;
        default:
          // unknown condition, message might have been generated by a newer version of the
          // web tool
          conditionResult = false;
      }
    });
    return conditionResult;
  } catch (e) {
    firebase.crashlytics().setAttribute('error-type', 'modal-message');
    firebase.crashlytics().log('error-message: data.conditions in MM not correct' + e.toString());
    firebase.crashlytics().recordError(e);
    return false;
  }
};

export const useFirebaseModalMessages = (): void => {
  const dispatch = useDispatch();
  const onboardingCompleted = useSelector<RootStateType, boolean>(isOnboardingCompleted);
  const contactAgreementEnabled = useSelector<RootStateType, boolean>(isContactAgreementEnabled);
  const shouldCall = contactAgreementEnabled && onboardingCompleted;
  const clinicalTrialId = useSelector<RootStateType, string | undefined>(
    state => state.user.clinicalTrialId,
  );

  const modalMessageCollection = firebase.firestore().collection('modals');

  useEffect(() => {
    if (shouldCall) {
      const subscriber = modalMessageCollection.onSnapshot(
        (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
          querySnapshot.docChanges().forEach(change => {
            const documentSnapshot = change.doc;
            const data = documentSnapshot.data();
            switch (change.type) {
              case 'added': {
                if (checkConditions(data, clinicalTrialId) === true) {
                  dispatch(
                    receiveModalMessage({
                      id: documentSnapshot.id,
                      body: data.body,
                      title: data.title,
                      image: data.image,
                      action: data.action,
                      link: data.link,
                    }),
                  );
                }
                break;
              }
              case 'modified': {
                //do nothing, update is not supported
                break;
              }
              case 'removed': {
                dispatch(removeModalMessage(documentSnapshot.id));
                break;
              }
            }
          });
        },
        onError,
      );
      return () => subscriber(); // unsubscribeNotification from stream when app is closed
    }
    return () => {};
  }, [dispatch, modalMessageCollection, shouldCall, clinicalTrialId]); //load every time
};