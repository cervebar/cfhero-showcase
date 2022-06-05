import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

import { BirthdateT } from '../../types/user';
import Button from '../../ui/Button';
import DatePicker, { handleSetDateT } from '../../ui/DatePicker';
import { DatePickerAndroid } from '../../ui/DatePickerAndroid';
import Modal from '../../ui/Modal';

type BirthdayModalProps = {
  dateDefault: BirthdateT;
  showBirthdayModal: boolean;
  setShowBirthdayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<BirthdateT>>;
};

type BirthdayModalT = FC<BirthdayModalProps>;

const BirthdayModal: BirthdayModalT = ({
  setDate,
  showBirthdayModal,
  setShowBirthdayModal,
  dateDefault,
}) => {
  const { t } = useTranslation('settings');

  const handleSetDate: handleSetDateT = ({ day, month, year }) => {
    setDate({ day, month, year });
  };

  const DatePickerComponent = useMemo(
    () => (Platform.OS === 'android' ? DatePickerAndroid : DatePicker),
    [],
  );

  return (
    <Modal
      noBackground
      name={BirthdayModal.name}
      visible={showBirthdayModal}
      justifyContent="space-around"
      buttonComponent={
        <Button dark onPress={() => setShowBirthdayModal(false)} qaID="SUBMIT_MODAL">
          {t('shared:buttons.ok')}
        </Button>
      }>
      <DatePickerComponent
        onInit={handleSetDate}
        onChange={handleSetDate}
        dayDefault={dateDefault.day}
        monthDefault={dateDefault.month}
        yearDefault={dateDefault.year}
      />
    </Modal>
  );
};

export default BirthdayModal;
