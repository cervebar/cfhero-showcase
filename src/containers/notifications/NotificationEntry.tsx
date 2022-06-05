import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { iconTrash } from '../../../assets/images/Images';
import { updateNotification } from '../../actions/notifications';
import { CUSTOM_TYPE, NotificationT, SYSTEM_TYPE, TimeModalDataT } from '../../types/notifications';
import Text from '../../ui/Text';
import { normalize } from '../../utils/normalizeSizes';
import { getNotificationWithUpdatedChecked } from '../../utils/notifications';
import styled from '../../utils/theme/styledComponents';
import { colors } from '../../utils/theme/theme';
import { DeleteCustomNotificationModal } from './DeleteCustomNotificatrionModal';
import { NotificationTimeButton } from './NotificationTimeButton';
import { NotificationUpdateTimeModal } from './NotificationUpdateTimeModal';
import ToggleSwitch from './ToogleSwitch';

const EntryWrapper = styled.View`
  width: 90%;
  flex-direction: column;
  border-bottom-color: ${colors.lightGrey};
  border-bottom-width: 2px;
  padding-top: ${normalize(9)};
  padding-bottom: ${normalize(9)};
`;
const LeftView = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const StyledText = styled(Text)`
  padding-right: ${normalize(15)};
  font-family: ${({ theme }) => theme.font.family.myriad};
  font-size: ${normalize(15)};
  height: ${normalize(30)};
`;

const defaultClosedModal = {
  id: '',
  minute: 0,
  hour: 0,
  visible: false,
};

const DELETE_NOTIFICATION_ICON_SIZE = 28;
const DeleteNotificationIcon = styled.Image`
  width: ${DELETE_NOTIFICATION_ICON_SIZE}px;
  height: ${DELETE_NOTIFICATION_ICON_SIZE}px;
`;

export const DeleteNotificationButton = styled(TouchableOpacity)`
  width: ${DELETE_NOTIFICATION_ICON_SIZE}px;
  height: ${DELETE_NOTIFICATION_ICON_SIZE}px;
  padding-left: 5px;
`;

export const DeleteWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  height: ${normalize(30)};
  margin-left: ${normalize(2)};
`;

export const NotificationEntry = (notification: NotificationT) => {
  const { t } = useTranslation('notificationSettings');
  const dispatch = useDispatch();
  const [toggleValue, setToggleValue] = useState(notification.checked);
  const [editTimeModal, setEditTimeModal] = useState<TimeModalDataT>(defaultClosedModal);
  const [canBeDeleted, setCanBeDeleted] = useState(
    notification.checked === false && notification.type === CUSTOM_TYPE,
  );
  const [isDeleteNotifiactionModalVisible, setIsDeleteNotifiactionModalVisible] =
    useState<boolean>(false);

  const onToggle = (value: boolean) => {
    setToggleValue(value);
    dispatch(updateNotification(getNotificationWithUpdatedChecked(notification, value)));
    if (value === false && notification.type === CUSTOM_TYPE) {
      setCanBeDeleted(true);
    } else {
      setCanBeDeleted(false);
    }
  };

  const onPressDelete = () => {
    setIsDeleteNotifiactionModalVisible(true);
  };

  const onCloseModal = () => {
    setEditTimeModal(defaultClosedModal);
  };

  const onCloseDeleteModal = () => {
    setIsDeleteNotifiactionModalVisible(false);
  };

  const textColor = toggleValue ? 'darkBlue' : 'darkBlueLighter';

  return (
    <EntryWrapper>
      <LeftView>
        <StyledText color={textColor}>
          {notification.type === SYSTEM_TYPE ? t(notification.name) : notification.name}
        </StyledText>
        <ToggleSwitch
          isOn={toggleValue}
          onColor={colors.white}
          offColor={colors.white}
          animationSpeed={100}
          thumbOnStyle={{ color: 'black' }}
          border={{
            borderColor: toggleValue ? colors.darkBlue : colors.darkBlueLighter,
            borderStyle: 'solid',
            borderWidth: 2,
          }}
          size="cfhero"
          onToggle={(value: boolean) => onToggle(value)}
          circleColor={toggleValue ? colors.darkBlue : colors.darkBlueLighter}
        />
      </LeftView>
      {canBeDeleted ? (
        <DeleteWrapper>
          <NotificationTimeButton
            isDisabledTouch={!toggleValue}
            notification={notification}
            setEditTimeModal={setEditTimeModal}
          />
          <DeleteNotificationButton onPress={onPressDelete}>
            <DeleteNotificationIcon source={iconTrash} />
          </DeleteNotificationButton>
        </DeleteWrapper>
      ) : (
        <NotificationTimeButton
          isDisabledTouch={!toggleValue}
          notification={notification}
          setEditTimeModal={setEditTimeModal}
        />
      )}
      <NotificationUpdateTimeModal
        visible={editTimeModal.visible}
        data={editTimeModal}
        notification={notification}
        onCloseModal={onCloseModal}
      />
      <DeleteCustomNotificationModal
        visible={isDeleteNotifiactionModalVisible}
        notification={notification}
        onCloseModal={onCloseDeleteModal}
      />
    </EntryWrapper>
  );
};
