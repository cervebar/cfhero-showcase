import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { BadgesContent } from '../containers/badges/BadgesContent';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import Screen from '../ui/Screen';

export const BadgesScreen: FC = () => {
  const { t } = useTranslation('profile');
  const { navigate } = useNav();

  return (
    <Screen
      headerTitle={t('badgesSectionTitle')}
      qaID="BADGES"
      withContainer={false}
      onBackButtonPress={() => navigate(Routes.Home)}>
      <BadgesContent />
    </Screen>
  );
};
