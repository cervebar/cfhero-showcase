import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Spacer from '../../ui/Spacer';
import Text from '../../ui/Text';
import { H3Text } from '../../ui/Texts';

export const CFH2UpgradeModal = () => {
  const { t } = useTranslation('cfh2UpgradeModal');
  const [visible, setVisible] = useState(true);

  return (
    <Modal name={'cfh2UpgradeModal'} visible={visible} withAvatar>
      <H3Text>{t('title')}</H3Text>
      <Text>{t('meetOtherCFHeroes')}</Text>
      <Spacer padding={15} />
      <Text>{t('hint')}</Text>
      <Button dark borderless onPress={() => setVisible(false)}>
        {t('button')}
      </Button>
    </Modal>
  );
};
