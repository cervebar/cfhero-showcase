import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import { setClinicalTrialId, setUserName } from '../actions/user';
import GenericAvatar from '../containers/genericAvatar/GenericAvatar';
import useNav from '../hooks/useNav';
import { RootStateType } from '../reducers/rootReducers';
import { Routes } from '../Routes';
import Button from '../ui/Button';
import { ClinicalTrialModal } from '../ui/ClinicalTrialModal';
import Screen from '../ui/Screen';
import TextInputWithoutFormik from '../ui/TextInputWithoutFormik';
import WizardHeading from '../ui/WizardHeading';
import { getScaledH1FontSize } from '../utils/getDiaryFontSizeByRatio';
import { ANALYTICS_ONBOARDING_3_INPUT_NAME } from '../utils/googleEvents';
import { normalize } from '../utils/normalizeSizes';
import styled from '../utils/theme/styledComponents';
import { generateUUID } from '../utils/userId';

const AvatarWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.View`
  position: absolute;
  right: 0;
  left: 0;
  bottom: ${normalize(90)};
  z-index: 10;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  left: 0;
  padding-right: ${normalize(30)};
  bottom: ${normalize(55)};
`;

const WizardName = () => {
  const { t } = useTranslation('wizardName');
  const [avatarName, setAvatarName] = useState('');
  const dispatch = useDispatch();
  const { navigate } = useNav();
  const [isClinicalTrialModalVisible, setIsClinicalTrialModalVisible] = useState(false);
  const storedClinicalTrialId = useSelector<RootStateType, string | undefined>(
    state => state.user.clinicalTrialId,
  );
  const [clinicalTrialIdState, setClinicalTrialIdState] = useState<string>(generateUUID());

  useEffect(() => {
    if (storedClinicalTrialId) {
      setClinicalTrialIdState(storedClinicalTrialId);
    }
  }, [storedClinicalTrialId]);

  const closeClinicalTrialModal = () => {
    setIsClinicalTrialModalVisible(false);
    setAvatarName('');
    dispatch(setClinicalTrialId(clinicalTrialIdState));
  };

  const handleChangeText = (text: string): void => {
    setAvatarName(text);
  };

  const handleSubmit = (): void => {
    if (avatarName.toUpperCase() === 'KLINIKA2021') {
      setIsClinicalTrialModalVisible(true);
      return;
    }
    dispatch(setUserName(avatarName));
    navigate(Routes.WizardBirthdate);
  };

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_ONBOARDING_3_INPUT_NAME));
  }, [dispatch]);

  return (
    <Screen withHeader={false} qaID="WIZARD_NAME" withScrollView>
      <WizardHeading size={getScaledH1FontSize()}>{t('title')}</WizardHeading>
      <AvatarWrapper>
        <GenericAvatar />
        <InputWrapper>
          <TextInputWithoutFormik
            value={avatarName}
            onChangeText={handleChangeText}
            maxLength={20}
            qaID="WIZARD_NAME"
            autoFocus={true}
          />
        </InputWrapper>
      </AvatarWrapper>
      <ButtonWrapper>
        <Button dark onPress={handleSubmit} disabled={avatarName.length === 0} qaID="SUBMIT_NAME">
          {t('shared:buttons.continue')}
        </Button>
      </ButtonWrapper>
      <ClinicalTrialModal
        visible={isClinicalTrialModalVisible}
        clinicalTrialId={clinicalTrialIdState}
        onClose={closeClinicalTrialModal}
      />
    </Screen>
  );
};

export default WizardName;
