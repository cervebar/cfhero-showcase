import React from 'react';

import { WheelOfFortuneContainer } from '../containers/inhalation/WheelOfFortuneContainer';
import { usePreventHardwareBackPressNavigationPop } from '../hooks/useHandleHardwareBackPress';
import Container from '../ui/Container';
import Screen from '../ui/Screen';
import { platformFork } from '../utils/platformFork';
import { bottomSpace } from '../utils/theme/layoutConstants';
import styled from '../utils/theme/styledComponents';

const StyledContainer = styled(Container)``;

export const WheelOfFortune = () => {
  usePreventHardwareBackPressNavigationPop();
  return (
    <Screen withHeader={false} qaID="WHEEL_OF_FORTUNE" withContainer={false}>
      <StyledContainer marginTop={platformFork(0, undefined)} paddingBottom={bottomSpace}>
        <WheelOfFortuneContainer />
      </StyledContainer>
    </Screen>
  );
};
