import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { shiftStateCheat } from '../../actions/application';
import { DevButton } from './DevButton';

export const DevShiftDayButton = () => {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    console.log('[DEV] Shifting state one day to past.');
    dispatch(shiftStateCheat());
  }, [dispatch]);

  return <DevButton onClick={handleClick} label="Shift Day" />;
};
