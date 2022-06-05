import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { BadgeGotoAction, BadgeT } from '../../types/badge';
import Button from '../../ui/Button';
import styled from '../../utils/theme/styledComponents';

const ActionButton = styled(Button)`
  margin: 0 10px;
`;

type OkButtonProps = { onCloseModal: () => void; data: BadgeT };

export const OkButton: FC<OkButtonProps> = ({ onCloseModal, data }) => {
  const { t } = useTranslation();

  const isDark = data.achieved || data.gotoAction === BadgeGotoAction.noAction;
  return (
    <ActionButton
      borderless
      onPress={onCloseModal}
      dark={isDark}
      gray={!isDark}
      qaID="badge_detail_modal_ok">
      {t('shared:buttons.ok')}
    </ActionButton>
  );
};

type MainButtonProps = { onGoToActionPress: (data: BadgeT) => void; data: BadgeT };

export const MainButton: FC<MainButtonProps> = ({ data, onGoToActionPress }) => {
  const { t } = useTranslation();

  if (data.achieved || data.gotoAction === BadgeGotoAction.noAction) {
    return null;
  }

  return (
    <ActionButton dark onPress={() => onGoToActionPress(data)} qaID="badge_detail_modal_ok">
      {t(`badgeScreen:${data.gotoAction}`)}
    </ActionButton>
  );
};
