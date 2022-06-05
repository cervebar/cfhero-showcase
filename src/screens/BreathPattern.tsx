import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { iconBreathLength } from '../../assets/images/Images';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { ButtonWrapper, ContentWrapper } from '../ui/BasicLayoutComponents';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import Text from '../ui/Text';
import WithAvatarWrapper from '../ui/WithAvatarWrapper';
import { normalize } from '../utils/normalizeSizes';
import styled from '../utils/theme/styledComponents';
import { WithAvatarMessageWrapper } from './FirstInhalationPrepareInhalator';

const IconLength = styled.Image`
  height: ${normalize(50)};
`;

const BreathPattern: FC = () => {
  const { t } = useTranslation('breathPattern');
  const { navigate } = useNav();

  const handleLeftPress = (): void => {
    navigate(Routes.Home);
  };

  const handleConfirmPress = (): void => {
    navigate(Routes.InhalationSetup);
  };

  return (
    <Screen withHeader={false} verticalSpacing qaID="BREATH_PATTERN">
      <ContentWrapper>
        <WithAvatarWrapper>
          <WithAvatarMessageWrapper>
            <Text size="h2" family="bold">
              {t('title')}
            </Text>
            <Spacer padding={10} />
            <Text size="default" family="bold">
              {t('breathSetupIntro')}
            </Text>
            <Spacer padding={5} />
            <Text size="default" family="bold">
              {t('breathSetupHowToFirst')}
            </Text>
            <Spacer padding={5} />
            <IconLength source={iconBreathLength} resizeMode="contain" />
            <Spacer padding={5} />
            <Text size="default" family="bold">
              {t('breathSetupHowToSecond')}
            </Text>
          </WithAvatarMessageWrapper>
        </WithAvatarWrapper>
      </ContentWrapper>
      <ButtonWrapper justifyContent="space-between">
        <Button symbol="home" onPress={handleLeftPress} qaID="GO_HOME">
          {t('shared:buttons.home')}
        </Button>
        <Button dark onPress={handleConfirmPress} qaID="SUBMIT_BREATH_PATTERN">
          {t('shared:buttons.continue')}
        </Button>
      </ButtonWrapper>
    </Screen>
  );
};

export default BreathPattern;
