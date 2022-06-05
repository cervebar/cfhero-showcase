import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { addNewMedicine } from '../actions/medicine';
import NewMedicineContainer from '../containers/newMedicine/NewMedicineContainer';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import { normalize } from '../utils/normalizeSizes';

const NewMedicine: FC = () => {
  const { t } = useTranslation('newMedicine');
  const dispatch = useDispatch();
  const { navigate } = useNav();
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);

  const handleBackButtonPress = (): void => {
    navigate(Routes.InhalationSetup);
  };

  const handleConfirmAction = (): void => {
    if (selectedMedicine) {
      dispatch(addNewMedicine(selectedMedicine));
    }
    navigate(Routes.InhalationSetup);
  };

  const bottomRightOverlayContent = (
    <Button dark marginTop={0} onPress={handleConfirmAction} qaID="SUBMIT_ADD_NEW_MEDICINE">
      {t('shared:buttons.done')}
    </Button>
  );

  return (
    <Screen
      headerTitle={t('header')}
      onBackButtonPress={handleBackButtonPress}
      withScrollView
      qaID="NEW_MEDICINE"
      bottomRightOverlayContent={bottomRightOverlayContent}
      bottomPadding={normalize(70)}>
      <NewMedicineContainer
        selectedMedicine={selectedMedicine}
        handleSetSelectedMedicine={setSelectedMedicine}
      />
    </Screen>
  );
};

export default NewMedicine;
