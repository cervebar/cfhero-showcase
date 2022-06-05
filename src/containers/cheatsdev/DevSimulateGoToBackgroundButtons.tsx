import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { INHALATION_MAX_PAUSED_LENGTH_SEC } from '../../constants/inhalation';
import SessionContext from '../session/SessionContext';
import { DevButton } from './DevButton';

/**
 * This button allows to simulate the session behavior when the app is going to and from the inactive state.
 * When you o to the inactive state it allows you to shift the session 40 mins back, so the behavior of canceling the
 * session can be properly tested.
 * @constructor
 */
export const DevSimulateGoToBackgroundButtons = () => {
  const { cheatApi } = useContext(SessionContext);
  const [isInBackground, setInBackground] = useState(false);

  const incTimeInBackground = useCallback(() => {
    cheatApi?.addSecondsInInactive(INHALATION_MAX_PAUSED_LENGTH_SEC + 5);
  }, [cheatApi]);

  const goToBackground = useCallback(() => setInBackground(true), [setInBackground]);
  const goBack = useCallback(() => setInBackground(false), [setInBackground]);

  const current = useRef(false);
  useEffect(() => {
    if (!cheatApi) return;
    if (current.current === isInBackground) return;
    current.current = isInBackground;

    if (isInBackground) {
      cheatApi.hookInactive();
    } else {
      cheatApi.hookActive();
    }
  }, [cheatApi, isInBackground, current]);

  if (!cheatApi) return null;

  return isInBackground ? (
    <>
      <DevButton onClick={goBack} label="Go Back" />
      <DevButton
        onClick={incTimeInBackground}
        label={`Add ${Math.floor(INHALATION_MAX_PAUSED_LENGTH_SEC / 60)} Mins`}
      />
    </>
  ) : (
    <DevButton onClick={goToBackground} label="Go To Back" />
  );
};
