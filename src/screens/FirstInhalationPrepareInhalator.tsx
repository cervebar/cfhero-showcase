import * as React from 'react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { inhalator } from '../../assets/images/Images';
import { setInhalationTourStep } from '../actions/application';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { InhalationTourStep } from '../types/application';
import { ButtonWrapper, ContentWrapper } from '../ui/BasicLayoutComponents';
import { BoxWrapper } from '../ui/BoxWrapper';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import Text from '../ui/Text';
import WithAvatarWrapper from '../ui/WithAvatarWrapper';
import styled from '../utils/theme/styledComponents';

const Inhalator = styled.Image`
  height: 100px;
`;

export const WithAvatarMessageWrapper = styled(BoxWrapper)`
  width: 220px;
  margin-left: 80px;
`;

const FirstInhalationPrepareInhalator: FC = () => {
  const { t } = useTranslation('firstInhalation');
  const dispatch = useDispatch();
  const { navigate } = useNav();

  const handleLeftPress = (): void => {
    navigate(Routes.Home);
  };

  const handleRightPress = (): void => {
    navigate(Routes.FirstInhalationHowTo);
    dispatch(setInhalationTourStep(InhalationTourStep.howToInhale));
  };

  return (
    <Screen withHeader={false} verticalSpacing qaID="FIRST_INHALATION_PREPARE_INHALATOR">
      <ContentWrapper>
        <WithAvatarWrapper>
          <WithAvatarMessageWrapper>
            <Text size="h2" family="bold">
              {t('title')}
            </Text>
            <Spacer padding={10} />
            <Text size="default" family="bold">
              {t('prepare')}
            </Text>
            <Spacer padding={20} />
            <Inhalator source={inhalator} resizeMode="contain" />
          </WithAvatarMessageWrapper>
        </WithAvatarWrapper>
      </ContentWrapper>
      <ButtonWrapper justifyContent="space-between">
        <Button symbol="home" onPress={handleLeftPress} qaID="HOME">
          {t('shared:buttons.home')}
        </Button>
        <Button dark onPress={handleRightPress} qaID="SUBMIT_FIRST_INHALATION_PREPARE_INHALATOR">
          {t('shared:buttons.continue')}
        </Button>
      </ButtonWrapper>
    </Screen>
  );
};

export default FirstInhalationPrepareInhalator;
