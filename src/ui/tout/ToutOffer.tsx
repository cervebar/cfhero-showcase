import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { toutScreenIcon } from '../../../assets/images/Images';
import { TOUT_KEYS_BUYOUT_PRICE } from '../../constants/tout';
import { RootStateType } from '../../reducers/rootReducers';
import { GenderT } from '../../types/user';
import Text from '../../ui/Text';
import {
  getScaledDefaultFontSize,
  getScaledMicroFontSize,
} from '../../utils/getDiaryFontSizeByRatio';
import { normalize } from '../../utils/normalizeSizes';
import styled from '../../utils/theme/styledComponents';
import { BoxWrapper } from '../BoxWrapper';
import Button from '../Button';

const IconImage = styled.Image`
  height: ${normalize(145)};
  width: ${normalize(145)};
  position: relative;
  left: ${normalize(-10)}; ;
`;

const ImageView = styled.View`
  display: flex;
  justify-content: flex-start;
  width: 40%;
`;

const ToutView = styled(BoxWrapper)`
  width: 100%;
  flex-direction: row;
  padding: 10px;
`;
const ToutTextView = styled.View`
  display: flex;
  width: 60%;
  padding-left: ${normalize(10)};
  justify-content: center;
`;

interface ToutShapeProps {
  onBuyTout: () => void;
  hasEnough: boolean;
}

export const ToutOffer = ({ onBuyTout, hasEnough }: ToutShapeProps) => {
  const { t } = useTranslation('brokenStreakScreen');
  const userGender =
    useSelector<RootStateType, GenderT | undefined>(state => state.user.gender) || 'male';
  const fontSizeToutHeading = getScaledDefaultFontSize();
  const fontSizeMicro = getScaledMicroFontSize();

  const cantBuyTout = () => {
    Alert.alert(t('notEnoughOxygensForTout'));
  };

  const buyButton = (
    <Button dark onPress={onBuyTout} disabled={!hasEnough}>
      {t('buy', { oxygens: TOUT_KEYS_BUYOUT_PRICE })}
    </Button>
  );

  return (
    <ToutView>
      <ImageView>
        <IconImage source={toutScreenIcon} resizeMode="contain" />
      </ImageView>
      <ToutTextView>
        <Text color="darkBlue" align="left" size={fontSizeToutHeading} lineHeight={1.5}>
          {t(hasEnough ? 'toutMessageTitleEnough' : 'toutMessageTitleNotEnough')}
        </Text>
        <Text color="darkBlue" align="left" size={fontSizeMicro}>
          {t(hasEnough ? 'toutMessageHasEnough' : `toutMessageNotEnough_${userGender}`, {
            oxygens: TOUT_KEYS_BUYOUT_PRICE,
          })}
        </Text>

        {hasEnough ? (
          buyButton
        ) : (
          <TouchableOpacity onPress={cantBuyTout}>{buyButton}</TouchableOpacity>
        )}
      </ToutTextView>
    </ToutView>
  );
};
