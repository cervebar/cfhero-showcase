import * as React from 'react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { oxygenBox, oxygenGradient } from '../../assets/images/Images';
import { setInhalationTourStep } from '../actions/application';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { InhalationTourStep } from '../types/application';
import { ButtonWrapper, ContentWrapper } from '../ui/BasicLayoutComponents';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import Text from '../ui/Text';
import WithAvatarWrapper from '../ui/WithAvatarWrapper';
import styled from '../utils/theme/styledComponents';
import { WithAvatarMessageWrapper } from './FirstInhalationPrepareInhalator';

const Gradient = styled.Image`
  height: 50px;
`;

const Box = styled.Image`
  height: 80px;
`;

const FirstInhalationHowTo: FC = () => {
  const { t } = useTranslation('firstInhalationHowTo');
  const { navigate } = useNav();
  const dispatch = useDispatch();

  const handleLeftPress = (): void => {
    navigate(Routes.Home);
  };

  const handleRightPress = (): void => {
    navigate(Routes.Inhalation);
    dispatch(setInhalationTourStep(InhalationTourStep.passed));
  };

  return (
    <Screen withHeader={false} verticalSpacing qaID="FIRST_INHALATION_HOW_TO">
      <ContentWrapper>
        <WithAvatarWrapper>
          <WithAvatarMessageWrapper>
            <Text size="h2" family="bold">
              {t('title')}
            </Text>
            <Spacer padding={10} />
            <Text size="default" family="bold">
              {t('inhale_exhale')}
            </Text>
            <Spacer padding={5} />
            <Gradient source={oxygenGradient} resizeMode="contain" />
            <Spacer padding={10} />
            <Text size="default" family="bold">
              {t('collect')}
            </Text>
            <Spacer padding={5} />
            <Box source={oxygenBox} resizeMode="contain" />
          </WithAvatarMessageWrapper>
        </WithAvatarWrapper>
      </ContentWrapper>
      <ButtonWrapper justifyContent="space-between">
        <Button symbol="home" onPress={handleLeftPress} qaID="GO_HOME">
          {t('shared:buttons.home')}
        </Button>
        <Button dark onPress={handleRightPress} qaID="SUBMIT_FIRST_INHALATION_HOW_TO">
          {t('shared:buttons.start')}
        </Button>
      </ButtonWrapper>
    </Screen>
  );
};

export default FirstInhalationHowTo;
