import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import { PersonalProfileContent } from '../containers/settings/personalProfile/PersonalProfileContent';
import Screen from '../ui/Screen';
import { ANALYTICS_VIEW_PERSONAL_PROFILE } from '../utils/googleEvents';

export const PersonalProfileScreen: FC = () => {
  const { t } = useTranslation('settingsNavigation');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_VIEW_PERSONAL_PROFILE));
  }, [dispatch]);

  return (
    <Screen headerTitle={t('profile')} verticalSpacing withScrollView qaID="personal_profile">
      <PersonalProfileContent />
    </Screen>
  );
};
