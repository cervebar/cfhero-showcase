import { useEffect } from 'react';
import Config from 'react-native-config';
import TestFairy from 'react-native-testfairy';
import { useSelector } from 'react-redux';

import { RootStateType } from '../../reducers/rootReducers';
import { UserT } from '../../types/user';

export const useTestFairyInit = (): void => {
  const user = useSelector<RootStateType, UserT | null>(state => state.user);

  useEffect(() => {
    // only staging variant is used for UAT
    if (Config.NODE_ENV === 'staging') {
      console.log('Testfairy initialied');
      TestFairy.log('Hello, TestFairy!');
      TestFairy.begin(TEST_FAIRY_API_KEY);
    }
  }, []);

  useEffect(() => {
    if (Config.NODE_ENV === 'staging') {
      TestFairy.log('User name changed!');
      if (user != null) {
        TestFairy.setUserId(user.name);
      }
    }
  }, [user]);
};
