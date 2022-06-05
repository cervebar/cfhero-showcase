import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Text from '../../ui/Text';
import { H3Text } from '../../ui/Texts';

export type WizardImportErrorModalTypes = null | 'offline' | 'invalidImportId';
export type WizardImportErrorModalProps = {
  type: WizardImportErrorModalTypes;
  onClose: () => void;
};

export const WizardImportErrorModal = ({ type, onClose }: WizardImportErrorModalProps) => {
  const { t } = useTranslation('wizardImport');

  return (
    <Modal name={`importError-${type}`} visible={!!type} withAvatar>
      <H3Text>{t(`errors.${type}.title`)}</H3Text>
      <Text>{t(`errors.${type}.info`)}</Text>
      <Button dark borderless onPress={onClose}>
        {t('shared:buttons.retry')}
      </Button>
    </Modal>
  );
};
