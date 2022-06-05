import React, { FC } from 'react';

import useShowCheats from '../../hooks/useShowCheats';
import { persistor } from '../../store';
import styled from '../../utils/theme/styledComponents';
import { DevAddFlutteringButton } from './DevAddFlutteringButton';
import { DevAddInhalationButton } from './DevAddInhalationButton';
import { DevAddOxygenButton } from './DevAddOxygenButton';
import { DevChangeLanguage } from './DevChangeLanguage';
import { DevCompleteInhalationsAndShiftDayButton } from './DevCompleteInhalationsAndShiftDayButton';
import { DevCopyStateFromFirebaseButton } from './DevCopyStateFromFirebaseButton';
import { DevSaveDevStateButton } from './DevSaveDevStateButton';
import { DevShiftDayButton } from './DevShiftDayButton';
import { DevStorageResetButton } from './DevStorageResetButton';

export const DevHomeLeftButtonsWrapper = styled.View`
  position: absolute;
  top: 64px;
  left: 0;
`;
const DevHomeRightButtonsWrapper = styled.View`
  position: absolute;
  top: 64px;
  right: 0;
`;

// TS complains about children being invalid, and React.isValidElement invalidates an array of elements, hence ts-ignore
// @ts-ignore
export const DevButtons: FC = ({ children }) => {
  const showCheats = useShowCheats();
  return children && showCheats ? children : null;
};

export const DevHomeButtons = () => (
  <DevButtons>
    <DevHomeLeftButtonsWrapper>
      <DevStorageResetButton persistor={persistor} />
      <DevSaveDevStateButton />
      <DevShiftDayButton />
      <DevCompleteInhalationsAndShiftDayButton />
    </DevHomeLeftButtonsWrapper>
    <DevHomeRightButtonsWrapper>
      <DevAddInhalationButton />
      <DevAddFlutteringButton />
      <DevAddOxygenButton />
      <DevCopyStateFromFirebaseButton />
      <DevChangeLanguage />
    </DevHomeRightButtonsWrapper>
  </DevButtons>
);
