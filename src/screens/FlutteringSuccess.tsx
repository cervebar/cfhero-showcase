import React from 'react';
import { useNavigationParam } from 'react-navigation-hooks';

import HomeButton from '../containers/sessionSuccess/components/buttons/HomeButton';
import SessionSuccessOverview from '../containers/sessionSuccess/steps/SessionSuccessOverview';
import { SessionT } from '../types/session';
import Screen from '../ui/Screen';

const InhalationSuccessScreen = () => {
  const session = useNavigationParam('session') as SessionT;

  return (
    <Screen withHeader={false} qaID="FLUTTERING_SUCCESS">
      <SessionSuccessOverview session={session} button={HomeButton} />
    </Screen>
  );
};

export default InhalationSuccessScreen;
