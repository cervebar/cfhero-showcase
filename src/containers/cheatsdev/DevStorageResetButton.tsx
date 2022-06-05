import notifee from '@notifee/react-native';
import React, { useCallback } from 'react';
import { NativeModules } from 'react-native';
import { Persistor } from 'redux-persist/es/types';

import { DevButton } from './DevButton';

type Props = {
  persistor: Persistor;
};

export const DevStorageResetButton = ({ persistor }: Props) => {
  const handleClick = useCallback(async () => {
    await persistor.purge();
    await notifee.cancelAllNotifications();
    NativeModules.DevSettings.reload();
  }, [persistor]);

  return <DevButton onClick={handleClick} label="Reset Storage" />;
};
