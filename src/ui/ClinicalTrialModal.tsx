import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { iconClose } from '../../assets/images/Images';
import Button from './Button';
import Modal, { CloseButton, CloseIcon } from './Modal';
import Text from './Text';

interface ClinicalTrialModalProps {
  visible: boolean;
  clinicalTrialId: string;
  onClose: () => void;
}

export const ClinicalTrialModal = ({
  visible,
  clinicalTrialId,
  onClose,
}: ClinicalTrialModalProps) => {
  const { t } = useTranslation('wizardName');

  return (
    <Modal
      visible={visible}
      qaID="CLINICAL_TRIAL_MODAL"
      withAvatar={false}
      name={ClinicalTrialModal.name}>
      <View>
        <Text size="h3" family="bold">
          {t('clinicalTrialTitle')}
        </Text>
        <Text size="h3" family="bold">
          {clinicalTrialId}
        </Text>
      </View>
      <CloseButton onPress={onClose}>
        <CloseIcon source={iconClose} resizeMode="contain" />
      </CloseButton>
      <Button dark onPress={onClose}>
        {t('shared:buttons.ok')}
      </Button>
    </Modal>
  );
};
