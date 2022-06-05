import firebase from '@react-native-firebase/app';
import React, { FC, useCallback } from 'react';

import { DevButton } from './DevButton';

export const DevTestCrashButton: FC = () => {
  const handleClick = useCallback(() => {
    firebase.crashlytics().crash();
  }, []);

  return <DevButton onClick={handleClick} label="Test Crash App" />;
};
