import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import FlutteringSetupContainer from '../containers/fluttering/FlutteringSetupContainer';
import Screen from '../ui/Screen';

const FlutteringSetup: FC = () => {
  const { t } = useTranslation('flutteringSetup');

  return (
    <Screen
      headerTitle={t('title')}
      withScrollView
      gradient="fluttering"
      withBackButton={false}
      qaID="FLUTTERING_SETUP">
      <FlutteringSetupContainer />
    </Screen>
  );
};

export default FlutteringSetup;
