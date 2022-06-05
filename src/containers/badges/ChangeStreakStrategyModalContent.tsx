import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Button from '../../ui/Button';
import { normalize } from '../../utils/normalizeSizes';
import styled from '../../utils/theme/styledComponents';
import { ChangeSSContent2 } from './padawan/ChangeSSContent2';
import { ChangeSSContent3 } from './padawan/ChangeSSContent3';
import { ChangeSSContent4 } from './padawan/ChangeSSContent4';

const ActionButton = styled(Button)`
  margin-right: ${normalize(10)};
  margin-left: ${normalize(10)};
`;

const Buttons = styled(View)`
  flex-direction: row;
  justify-content: center;
  width: 90%;
  flex-wrap: wrap;
`;

const screens = [ChangeSSContent2, ChangeSSContent3, ChangeSSContent4];

interface Props {
  onCloseModal: () => void;
}

export const ChangeStreakStrategyModalContent: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation();
  const [screenId, setScreenId] = useState(0);
  const Screen = screens[screenId];

  const canGoPrev = screenId > 0;
  const canGoNext = screenId + 1 < screens.length;
  const isLastScreen = screenId === screens.length - 1;
  const goToPrevScreen = () => {
    setScreenId(currentId => currentId - 1);
  };
  const goToNextScreen = () => {
    setScreenId(currentId => currentId + 1);
  };

  return (
    <>
      <Screen />
      <Buttons>
        {canGoPrev && (
          <ActionButton gray borderless onPress={goToPrevScreen} qaID="badge_detail_modal_prev">
            {t('shared:buttons.prev')}
          </ActionButton>
        )}
        {canGoNext && (
          <ActionButton dark onPress={goToNextScreen} qaID="badge_detail_modal_next">
            {t('shared:buttons.next')}
          </ActionButton>
        )}
        {isLastScreen && (
          <ActionButton dark onPress={onCloseModal} qaID="badge_detail_modal_ok">
            {t('shared:buttons.ok')}
          </ActionButton>
        )}
      </Buttons>
    </>
  );
};
