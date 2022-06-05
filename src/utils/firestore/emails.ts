import firebase from '@react-native-firebase/app';

import { Collections } from '../../constants/collectionsFirebase';

export const addEmailToSendTerms = (
  email: string,
  contactAgreementEnabled: boolean,
  isProdEnv: boolean,
  userId: string | undefined,
  language: string,
): void => {
  if (userId) {
    const collection = firebase.firestore().collection(Collections.TermsEmails);
    collection
      .doc(userId)
      .set({
        email,
        isProdEnv,
        contactAgreementEnabled,
        lang: language,
      })
      .catch(err => {
        // handle error
        console.error('firebase error ', err);
      });
  }
};
