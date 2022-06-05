import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { iconClose } from '../../../assets/images/Images';
import { selector } from '../../packages/automationSelectors';
import { RootStateType } from '../../reducers/rootReducers';
import { BadgeT } from '../../types/badge';
import { GenderT } from '../../types/user';
import { BadgeIconModal } from '../../ui/badges/BadgeIconModal';
import { NewBadgeLabel } from '../../ui/badges/NewBadgeLabel';
import Modal, { CloseButton, CloseIcon } from '../../ui/Modal';
import Text from '../../ui/Text';
import { getScaledMicroFontSize } from '../../utils/getDiaryFontSizeByRatio';
import { normalize } from '../../utils/normalizeSizes';
import styled from '../../utils/theme/styledComponents';
import { MainButton, OkButton } from './BadgeButtons';

type BadgeModalT = FC<{
  data: BadgeT;
  visible: boolean;
  onCloseModal: () => void;
  onGoToActionPress: (data: BadgeT) => void;
  isNewlyAchieved: boolean;
}>;

const Texts = styled(View)`
  margin-bottom: ${normalize(30)};
  width: 100%;
`;

const Buttons = styled(View)`
  margin-bottom: 30px;
  flex-direction: row;
  justify-content: space-evenly;
  width: 110%;
`;

const StyledLabel = styled.View`
  margin-top: ${normalize(-20)};
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

const scaledMicroFontSize = getScaledMicroFontSize();

// this one is showed from "Achievements" screen
export const BadgeModal: BadgeModalT = ({
  data,
  visible,
  onCloseModal,
  onGoToActionPress,
  isNewlyAchieved,
}) => {
  const { t } = useTranslation();
  const userGender =
    useSelector<RootStateType, GenderT | undefined>(state => state.user.gender) || 'male';
  const messageType = data.achieved ? 'message' : 'messageNotAchieved';
  const message = data.genderSpecific
    ? t(`badges:${data.keyInLib}.${messageType}.${userGender}`, {
        thresholdValue: data.thresholdValue,
      })
    : t(`badges:${data.keyInLib}.${messageType}`, { thresholdValue: data.thresholdValue });

  return (
    <Modal
      name={BadgeModal.name}
      visible={visible}
      justifyContent="center"
      onModalOverlayClick={onCloseModal}>
      <CloseButton onPress={onCloseModal} {...selector('CLOSE_MODAL')}>
        <CloseIcon source={iconClose} resizeMode="contain" />
      </CloseButton>
      <BadgeIconModal data={data} qaID={data.id} />
      {isNewlyAchieved && (
        <StyledLabel>
          <NewBadgeLabel />
        </StyledLabel>
      )}
      <Texts>
        <Text size="h3" family="bold" align="left" color="darkBlue">
          {t(`badges:${data.keyInLib}.title`, {
            thresholdValue: `${data.thresholdValue}`,
            levelTitle: `${data.level}`,
          })}
        </Text>
        <Text family="myriad" size={scaledMicroFontSize} align="left" color="darkBlue">
          {message}
        </Text>
      </Texts>
      <Buttons>
        <OkButton onCloseModal={onCloseModal} data={data} />
        <MainButton onGoToActionPress={onGoToActionPress} data={data} />
      </Buttons>
    </Modal>
  );
};
