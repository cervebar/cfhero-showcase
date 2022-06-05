import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { DevButton } from './DevButton';

export function DevChangeLanguage() {
  const { i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <DevButton onClick={() => setModalVisible(true)} label="Change language" />
      <Modal
        name={DevChangeLanguage.name}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onModalOverlayClick={() => setModalVisible(false)}>
        {['cs', 'sk', 'pl', 'uk'].map(language => (
          <Button
            dark
            borderless
            key={language}
            onPress={() => {
              i18n.changeLanguage(language);
              setModalVisible(false);
            }}>
            {language}
          </Button>
        ))}
      </Modal>
    </>
  );
}
