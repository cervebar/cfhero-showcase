import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styled from '../../utils/theme/styledComponents';

const DevButtonWrapper = styled(TouchableOpacity)`
  background-color: magenta;
  width: 90px;
  padding: 10px;
  margin-bottom: 10px;
  min-height: 55px;
`;

type Props = {
  onClick: () => void;
  label: string;
};

export const DevButton = ({ onClick, label }: Props) => (
  <DevButtonWrapper onPress={onClick}>
    <Text allowFontScaling={false}>{label}</Text>
  </DevButtonWrapper>
);
