import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';

import { iconPlusWhite } from '../../assets/images/Images';
import styled from '../utils/theme/styledComponents';
import Button from './Button';

const StyledIcon = styled(Image)`
  width: 15px;
  height: 15px;
`;

const ButtonWrapper = styled.View`
  justify-content: center;
  width: 100%;
`;

interface AddItemButtonProps {
  onButtonPress: () => void;
}

export const AddItemButton = ({ onButtonPress }: AddItemButtonProps) => {
  const { t } = useTranslation('');

  const icon = <StyledIcon source={iconPlusWhite} resizeMode="contain" />;

  return (
    <ButtonWrapper>
      <Button dark onPress={onButtonPress} icon={icon} qaID="ADD_ITEM">
        {t('shared:buttons.select')}
      </Button>
    </ButtonWrapper>
  );
};
