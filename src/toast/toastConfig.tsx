import React from 'react';
import Toast from 'react-native-toast-message';

import Text from '../ui/Text';
import styled from '../utils/theme/styledComponents';

const ToastBase = styled.TouchableOpacity`
  flex: 1;
  height: 60px;
  width: 90%;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme: { borderRadius } }) => borderRadius.default};
`;

const ToastText = styled(Text)`
  font-family: ${({ theme }) => theme.font.family.myriad};
  font-size: ${({ theme }) => theme.font.size.nano}
  color: ${({ theme: { colors } }) => colors.white};
  height: 30px;
  text-align: center;
`;

const ToastInfo = styled(ToastBase)`
  background-color: ${({ theme: { colors } }) => colors.darkBlue};
`;

const ToastError = styled(ToastBase)`
  background-color: ${({ theme: { colors } }) => colors.error};
`;

const ToastSuccess = styled(ToastBase)`
  background-color: ${({ theme: { colors } }) => colors.success};
`;

type ToastProps = {
  text1: string;
};

/**
 * simplest toast config, to make other types use:
 *  any_other_custom_type: () => {},
 * error: ({ text1, props, ...rest }) => (
 */
export const toastConfig = {
  info: ({ text1 }: ToastProps) => (
    <ToastInfo onPress={Toast.hide}>
      <ToastText>{text1}</ToastText>
    </ToastInfo>
  ),
  error: ({ text1 }: ToastProps) => (
    <ToastError onPress={Toast.hide}>
      <ToastText>{text1}</ToastText>
    </ToastError>
  ),
  success: ({ text1 }: ToastProps) => (
    <ToastSuccess onPress={Toast.hide}>
      <ToastText>{text1}</ToastText>
    </ToastSuccess>
  ),
};
