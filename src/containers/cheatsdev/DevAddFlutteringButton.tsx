import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { addCompletedFluttering } from '../../actions/fluttering';
import { SessionResolutionState } from '../../types/session';
import { getTimestamp } from '../../utils/time';
import { DevButton } from './DevButton';

export const DevAddFlutteringButton = () => {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(
      addCompletedFluttering({
        created: getTimestamp(),
        oxygens: 2,
        duration: 10,
        flutterId: 'flutter_acapella',
        resolutionState: SessionResolutionState.ok,
      }),
    );
  }, [dispatch]);

  return <DevButton onClick={handleClick} label="Add Fluttering" />;
};
