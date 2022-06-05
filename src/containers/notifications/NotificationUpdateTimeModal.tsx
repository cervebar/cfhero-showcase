import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { iconClose } from '../../../assets/images/Images';
import { updateNotification } from '../../actions/notifications';
import { selector } from '../../packages/automationSelectors';
import { NotificationT, TimeModalDataT } from '../../types/notifications';
import Button from '../../ui/Button';
import Modal, { CloseButton, CloseIcon } from '../../ui/Modal';
import Text from '../../ui/Text';
import { TimePicker } from '../../ui/TimePicker';
import { normalize } from '../../utils/normalizeSizes';
import { getNotificationWithUpdatedTime } from '../../utils/notifications';
import styled from '../../utils/theme/styledComponents';
import { HOUR_DEFAULT, HandleSetTimeT, MINUTE_DEFAULT } from '../../utils/timePicker';

const Title = styled(Text)`
  margin-bottom: ${normalize(30)};
`;

interface NotificationModalProps {
  visible: boolean;
  data: TimeModalDataT;
  onCloseModal: () => void;
  notification: NotificationT;
}

export const NotificationUpdateTimeModal = ({
  visible,
  data,
  notification,
  onCloseModal,
}: NotificationModalProps) => {
  const { t } = useTranslation('notificationSettings');
  const dispatch = useDispatch();
  const [time, setTime] = useState({ hour: HOUR_DEFAULT, minute: MINUTE_DEFAULT });

  const handleSetTime: HandleSetTimeT = ({ minute, hour }) => {
    setTime({ minute, hour });
  };

  const handleClick = (): void => {
    dispatch(
      updateNotification(getNotificationWithUpdatedTime(notification, time.hour, time.minute)),
    );
    onCloseModal();
  };
  return (
    <Modal
      name={NotificationUpdateTimeModal.name}
      visible={visible}
      justifyContent="center"
      onModalOverlayClick={onCloseModal}>
      <CloseButton onPress={onCloseModal} {...selector('CLOSE_MODAL')}>
        <CloseIcon source={iconClose} resizeMode="contain" />
      </CloseButton>
      <View>
        <Title size="h3" family="bold">
          {t('chooseTime')}
        </Title>
        <TimePicker
          onInit={handleSetTime}
          onChange={handleSetTime}
          hourDefault={data.hour}
          minuteDefault={data.minute}
        />
        <Button dark onPress={() => handleClick()} qaID="SUBMIT_NOTIFICATION_MODAL">
          {t('shared:buttons.ok')}
        </Button>
      </View>
    </Modal>
  );
};
