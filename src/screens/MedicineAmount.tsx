import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import MedicineAmountContainer from '../containers/inhalationSetup/MedicineAmountContainer';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import Screen from '../ui/Screen';

const MedicineAmount: FC = () => {
  const { t } = useTranslation('inhalationSetup');
  const { navigate } = useNav();

  const handleBackButtonPress = (): void => {
    navigate(Routes.InhalationSetup);
  };

  return (
    <Screen
      headerTitle={t('title')}
      withScrollView
      gradient="inhalation"
      onBackButtonPress={handleBackButtonPress}
      qaID="MEDICINE_AMOUNT">
      <MedicineAmountContainer />
    </Screen>
  );
};

export default MedicineAmount;
