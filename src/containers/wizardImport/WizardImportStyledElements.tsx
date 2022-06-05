import TextInputWithoutFormik from '../../ui/TextInputWithoutFormik';
import styled from '../../utils/theme/styledComponents';

export const Container = styled.View`
  flex: 1;
  padding: 0 8px 16px;
  justify-content: center;
`;
export const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const WhiteBox = styled.View`
  background-color: #ffffff;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 16px;
  padding: 16px;
`;
export const WhiteBoxStep = styled.View`
  flex-direction: row;
  justify-content: center;
`;
export const WhiteBoxStepLeft = styled.View`
  justify-content: flex-start;
  padding: 0;
  margin-right: 8px;
`;
export const WhiteBoxStepRight = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 0 4px;
`;

export const ImportIdInput = styled(TextInputWithoutFormik).attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray,
}))`
  background-color: ${({ theme: { colors } }) => colors.lightGrey};
  color: ${({ theme: { font } }) => font.color.default};
  font-size: ${({ theme: { font } }) => font.size.h3};
  width: 80%;
  height: 54px;
`;
