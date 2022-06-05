import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import InhalationSetupContainer from '../containers/inhalationSetup/InhalationSetupContainer';
import InhalationCheckModal from '../containers/newMedicine/InhalationCheckModal';
import useMyState from '../hooks/useMyState';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { getCompletedInhalations } from '../selectors/inhalation';
import Button, { SymbolType } from '../ui/Button';
import Screen from '../ui/Screen';
import { normalize } from '../utils/normalizeSizes';

const InhalationSetup: FC = () => {
  const { t } = useTranslation('inhalationSetup');
  const { navigate } = useNav();
  const [showInhalationCheckModal, setShowInhalationCheckModal] = useState(false);

  const activeInhalator = useMyState(state => state.inhalator.activeId);
  const activeMedicine = useMyState(state => state.medicine.currentMedicine);
  const dailyInhalationsCompleted = useMyState(getCompletedInhalations);
  const dailyPlannedInhalations = useMyState(state => state.inhalation.dailyPlannedInhalations);
  const inhalationOverplanCheck = useMyState(
    state => state.inhalation.inhalationOverplanCheckEnabled,
  );
  const totalSuccessfulInhalations = useMyState(
    state => state.inhalation.totalSuccessfulInhalations,
  );

  const goBackFromInhalationSetup = useCallback(() => {
    if (totalSuccessfulInhalations === 2) {
      navigate(Routes.BreathPattern);
    } else {
      navigate(Routes.Home);
    }
  }, [navigate, totalSuccessfulInhalations]);

  const isContinueDisabled = !activeInhalator || !activeMedicine;

  const onContinueButtonPress = (): void => {
    if (isContinueDisabled) {
      Alert.alert(t('continue_disabled_msg'));
    } else {
      if (inhalationOverplanCheck && dailyPlannedInhalations <= dailyInhalationsCompleted) {
        setShowInhalationCheckModal(true);
      } else {
        navigate(Routes.MedicineAmount);
      }
    }
  };

  const bottomLeftOverlayContent = (
    <Button onPress={() => navigate(Routes.Home)} symbol={SymbolType.home} qaID="HOME">
      {t('shared:buttons.home')}
    </Button>
  );

  const bottomRightOverlayContent = (
    <Button dark onPress={onContinueButtonPress} qaID="CONTINUE">
      {t('shared:buttons.continue')}
    </Button>
  );

  return (
    <>
      <Screen
        headerTitle={t('title')}
        withScrollView
        gradient="inhalation"
        onBackButtonPress={goBackFromInhalationSetup}
        qaID="INHALATION_SETUP"
        bottomLeftOverlayContent={bottomLeftOverlayContent}
        bottomRightOverlayContent={bottomRightOverlayContent}
        bottomPadding={normalize(70)}>
        <InhalationSetupContainer />
      </Screen>

      <InhalationCheckModal
        showInhalationCheckModal={showInhalationCheckModal}
        setShowInhalationCheckModal={setShowInhalationCheckModal}
      />
    </>
  );
};

export default InhalationSetup;
