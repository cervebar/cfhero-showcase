import React from 'react';

import { keyBroken, keyOwned } from '../../../assets/images/Images';
import { getScaledDefaultFontSize } from '../../utils/getDiaryFontSizeByRatio';
import { normalize } from '../../utils/normalizeSizes';
import styled from '../../utils/theme/styledComponents';
import Text from '../Text';

const KeyImage = styled.Image`
  width: ${normalize(25)};
  margin-left: ${normalize(7)};
`;

export const LevelKeyWrapperView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${normalize(8)};
`;

interface LevelTextKeyProps {
  keysCollected: number;
  keysNeeded: number;
  isBroken: boolean;
}

export const LevelTextKey = ({ keysCollected, keysNeeded, isBroken }: LevelTextKeyProps) => {
  return (
    <LevelKeyWrapperView>
      <Text size={getScaledDefaultFontSize()}>{`${keysCollected}/${keysNeeded}`}</Text>
      <KeyImage source={isBroken ? keyBroken : keyOwned} resizeMode="contain" />
    </LevelKeyWrapperView>
  );
};
