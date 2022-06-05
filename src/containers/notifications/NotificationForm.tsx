import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

import { MAX_NOTIFICATIONS_IN_CATEGORY } from '../../constants/cfheroConstants';
import { NotificationT } from '../../types/notifications';
import Spacer from '../../ui/Spacer';
import Text from '../../ui/Text';
import { compareTimes } from '../../utils/compareTimes';
import { normalize } from '../../utils/normalizeSizes';
import styled from '../../utils/theme/styledComponents';
import { DARK_BLUE_COLOR } from '../../utils/theme/theme';
import { AddNotificationModal } from './AddNotificationModal';
import { NotificationEntry } from './NotificationEntry';

const Wrapper = styled.View`
  align-items: center;
  width: 100%;
`;

const AddNotificationText = styled(Text)`
  padding-right: ${normalize(15)};
  font-family: ${({ theme }) => theme.font.family.myriadBold};
  font-size: ${normalize(15)};
  height: ${normalize(30)};
  text-transform: uppercase;
`;

const StyledText = styled(Text)`
  text-align: left;
  font-family: ${({ theme }) => theme.font.family.myriadBold};
  font-size: ${normalize(16)};
`;

export const AddNotificationButton = styled(TouchableOpacity)`
  padding-top: 20px;
`;

type NotificationFormProps = {
  category: string;
  notifications: NotificationT[];
};

export const NotificationForm = ({ notifications, category }: NotificationFormProps) => {
  const { t } = useTranslation('notificationSettings');
  const [isAddNotificationModalVisible, setIsAddNotificationModalVisible] =
    useState<boolean>(false);
  return (
    <Wrapper>
      <StyledText color={DARK_BLUE_COLOR}>{t(`${category}Title`)}</StyledText>
      {notifications.sort(compareTimes).map(notification => (
        <NotificationEntry key={notification.id} {...notification} />
      ))}
      {notifications.length < MAX_NOTIFICATIONS_IN_CATEGORY && (
        <>
          <AddNotificationButton onPress={() => setIsAddNotificationModalVisible(true)}>
            <AddNotificationText color={DARK_BLUE_COLOR}>{`+ ${t(
              'addNotificationButtonText',
            )}`}</AddNotificationText>
          </AddNotificationButton>
          <AddNotificationModal
            visible={isAddNotificationModalVisible}
            category={category}
            onCloseModal={() => setIsAddNotificationModalVisible(false)}
          />
        </>
      )}
      <Spacer padding={5} />
    </Wrapper>
  );
};
