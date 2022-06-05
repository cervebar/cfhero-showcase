import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { iconClose, iconHint, iconQuestionnaire, iconShop } from '../../../assets/images/Images';
import { logReceiveModalMessage } from '../../actions/modalMessage';
import { ModalMessageDataT } from '../../types/modalMessage';
import { normalize } from '../../utils/normalizeSizes';
import styled from '../../utils/theme/styledComponents';
import Button from '../Button';
import Modal, { CloseButton, CloseIcon } from '../Modal';
import Text from '../Text';

const Title = styled(Text)`
  margin-bottom: ${normalize(10)};
`;

const Content = styled.View`
  flex-grow: 1;
`;

const ScrollWrapper = styled(ScrollView)`
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;

const ModalIcon = styled(Image)`
  width: ${normalize(60)};
  height: ${normalize(60)};
  margin: auto;
`;

const IconWrapper = styled.View`
  margin-bottom: ${normalize(10)};
`;

const MessageWrapper = styled(Text)`
  width: 100%;
`;

interface ModalMessageProps {
  modalMessageData: ModalMessageDataT;
  onClose: () => void;
  onAction: () => void;
}

const getImageSource = (iconType: string) => {
  switch (iconType) {
    case 'questionnaire':
      return iconQuestionnaire;
    case 'shop':
      return iconShop;
    default:
      return iconHint;
  }
};

export const MessageDetailsModal = ({ modalMessageData, onClose, onAction }: ModalMessageProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  dispatch(
    logReceiveModalMessage({
      id: modalMessageData.id,
      title: modalMessageData.title,
      action: modalMessageData.action,
    }),
  );

  return (
    <Modal name={MessageDetailsModal.name} visible={true}>
      {onClose && (
        <CloseButton onPress={onClose}>
          <CloseIcon source={iconClose} resizeMode="contain" />
        </CloseButton>
      )}
      <Title size="h3" family="bold">
        {modalMessageData.title}
      </Title>
      <ScrollWrapper bounces={false} showsHorizontalScrollIndicator={false}>
        <Content>
          <IconWrapper>
            <ModalIcon source={getImageSource(modalMessageData.image)} resizeMode="contain" />
          </IconWrapper>
          <MessageWrapper size="small" family="bold">
            {modalMessageData.body}
          </MessageWrapper>
        </Content>
      </ScrollWrapper>
      <Button dark onPress={onAction} qaID="SUBMIT_MODAL_MESSAGE_MODAL">
        {t('shared:buttons.ok')}
      </Button>
    </Modal>
  );
};
