import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BoxWrapper } from '../../ui/BoxWrapper';
import Text from '../../ui/Text';
import { normalize } from '../../utils/normalizeSizes';
import styled from '../../utils/theme/styledComponents';
import { DARK_BLUE_COLOR, DARK_BLUE_LIGHTER_COLOR, colors } from '../../utils/theme/theme';
import ToggleSwitch from './ToogleSwitch';

const EntryWrapper = styled(BoxWrapper)`
  width: 100%;
  margin-bottom: 20px;
  flex-direction: column;
  padding: 10px;
`;
const LeftView = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const StyledText = styled(Text)`
  padding-right: ${normalize(15)};
  font-size: ${normalize(16)};
  font-family: ${({ theme }) => theme.font.family.myriad};
  max-width: 80%;
  text-align: left;
`;

interface AdHocProps {
  textKey: string;
  defaultToggleValue: boolean;
  onToggleSpecific: (value: boolean) => void;
}

export const AdHocNotification = ({
  textKey,
  defaultToggleValue,
  onToggleSpecific,
}: AdHocProps) => {
  const { t } = useTranslation('notificationSettings');

  const [toggleValue, setToggleValue] = useState(defaultToggleValue);

  const onToggle = (value: boolean) => {
    setToggleValue(value);
    onToggleSpecific(value);
  };

  const toogleColor = toggleValue ? colors.darkBlue : colors.darkBlueLighter;
  // checkbox_input_settings
  return (
    <EntryWrapper>
      <LeftView>
        <StyledText color={toggleValue ? DARK_BLUE_COLOR : DARK_BLUE_LIGHTER_COLOR}>
          {t(textKey)}
        </StyledText>
        <ToggleSwitch
          isOn={toggleValue}
          onColor={colors.white}
          offColor={colors.white}
          animationSpeed={100}
          thumbOnStyle={{ color: 'black' }}
          border={{
            borderColor: toogleColor,
            borderStyle: 'solid',
            borderWidth: 2,
          }}
          size="cfhero"
          onToggle={(value: boolean) => onToggle(value)}
          circleColor={toogleColor}
        />
      </LeftView>
    </EntryWrapper>
  );
};
