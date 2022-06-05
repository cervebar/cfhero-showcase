import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { iconClose } from '../../../assets/images/Images';
import { createNotificationSettings } from '../../actions/notifications';
import { selector } from '../../packages/automationSelectors';
import { WEEKEND, WEEK_DAYS } from '../../types/days';
import { CUSTOM_TYPE, NotificationRoute, WORKDAYS_CATEGORY } from '../../types/notifications';
import Button from '../../ui/Button';
import Modal, { CloseButton, CloseIcon } from '../../ui/Modal';
import TextInputWithoutFormik from '../../ui/TextInputWithoutFormik';
import { TimePicker } from '../../ui/TimePicker';
import { HOUR_DEFAULT, HandleSetTimeT, MINUTE_DEFAULT } from '../../utils/timePicker';

interface AddNotificationModalProps {
  visible: boolean;
  category: string;
  onCloseModal: () => void;
}

export const AddNotificationModal = ({
  visible,
  category,
  onCloseModal,
}: AddNotificationModalProps) => {
  const { t } = useTranslation('notificationSettings');
  const dispatch = useDispatch();

  const [time, setTime] = useState({ hour: HOUR_DEFAULT, minute: MINUTE_DEFAULT });
  const [title, setTitle] = useState<string>(t('customNotificationTitle'));

  const handleSetTime: HandleSetTimeT = ({ minute, hour }) => {
    setTime({ minute, hour });
  };

  const onConfirm = () => {
    dispatch(
      createNotificationSettings({
        id: `${Math.random().toString(36).substring(10)}-${new Date().getMilliseconds()}`,
        name: title,
        texts: [{ title, body: '' }],
        type: CUSTOM_TYPE,
        category: category,
        hour: time.hour,
        minute: time.minute,
        checked: true,
        repeating: category === WORKDAYS_CATEGORY ? WEEK_DAYS : WEEKEND,
        route: NotificationRoute.HOMESCREEN_ROUTE,
      }),
    );
    close();
  };

  const close = () => {
    setTitle(t('customNotificationTitle'));
    onCloseModal();
  };

  return (
    <Modal
      name={AddNotificationModal.name}
      visible={visible}
      justifyContent="center"
      onModalOverlayClick={close}>
      <CloseButton onPress={close} {...selector('CLOSE_MODAL')}>
        <CloseIcon source={iconClose} resizeMode="contain" />
      </CloseButton>
      <View>
        <TextInputWithoutFormik
          value={title}
          onChangeText={value => setTitle(value)}
          maxLength={20}
          qaID="add_notification_modal"
          autoFocus={true}
        />
        <TimePicker
          onInit={handleSetTime}
          onChange={handleSetTime}
          hourDefault={8}
          minuteDefault={0}
        />
        <Button dark onPress={() => onConfirm()}>
          {t('shared:buttons.safe')}
        </Button>
      </View>
    </Modal>
  );
};
