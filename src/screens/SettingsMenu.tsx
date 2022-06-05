import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsMenuContent } from '../containers/settings/SettingsMenuContent';
import Screen from '../ui/Screen';

export const SettingsMenuScreen: FC = () => {
  const { t } = useTranslation('settingsNavigation');

  return (
    <Screen headerTitle={t('menu_title')} verticalSpacing withScrollView qaID="SETTINGS_MENU">
      <SettingsMenuContent />
    </Screen>
  );
};
