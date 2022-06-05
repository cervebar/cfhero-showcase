import React, { useCallback, useContext } from 'react';

import SessionContext from '../session/SessionContext';
import { DevButton } from './DevButton';

export const DevCheatButton = () => {
  const { cheatApi, startSession } = useContext(SessionContext);

  const handleClick = useCallback(() => {
    if (!cheatApi) return;
    startSession();
    cheatApi.addTime(200);
    cheatApi.addBoxOxygens(20);
  }, [cheatApi, startSession]);

  if (!cheatApi) {
    return null;
  }

  return <DevButton onClick={handleClick} label="Cheat" />;
};
