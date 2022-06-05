import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { StoreBackgroundCategory } from '../containers/store/background/StoreBackgroundCategory';
import useNav from '../hooks/useNav';
import Screen from '../ui/Screen';

export const StoreCategoryBackgroundScreen: FC = () => {
  const { t } = useTranslation('store');
  const { goBack } = useNav();

  return (
    <Screen
      gradient="shop"
      headerTitle={t('categories.titles.background')}
      qaID="STORE_BACKGROUND"
      onBackButtonPress={goBack}
      rightBalance>
      <StoreBackgroundCategory />
    </Screen>
  );
};
