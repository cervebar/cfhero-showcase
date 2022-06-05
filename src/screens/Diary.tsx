import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import DiaryContent from '../containers/diary/DiaryContent';
import DiaryHeader from '../containers/diary/DiaryHeader';
import useInhalations from '../hooks/useInhalations';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import ButtonInHeader from '../ui/ButtonInHeader';
import Screen from '../ui/Screen';
import { ANALYTICS_VIEW_DIARY } from '../utils/googleEvents';

const DiaryScreen = () => {
  const { t } = useTranslation('diary');
  const { navigate } = useNav();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_VIEW_DIARY));
  }, [dispatch]);

  const inhalations = useInhalations();
  if (!inhalations.length) {
    return <ActivityIndicator />;
  }

  return (
    <Screen
      gradient="diary"
      onBackButtonPress={() => navigate(Routes.Home)}
      headerTitle={t('title')}
      headerRightComponent={
        <ButtonInHeader onPress={() => navigate(Routes.SettingsMenu)}>
          {t('headerButton')}
        </ButtonInHeader>
      }
      withContainer={false}
      withScrollView={Platform.OS === 'android'}
      qaID="DIARY">
      <DiaryHeader />
      <DiaryContent />
    </Screen>
  );
};

export default DiaryScreen;
