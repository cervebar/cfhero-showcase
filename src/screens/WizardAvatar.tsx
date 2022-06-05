import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { setDefaultAvatar } from '../actions/avatar';
import { trackUserPath } from '../actions/tracking';
import { setUserGender } from '../actions/user';
import GenericAvatar from '../containers/genericAvatar/GenericAvatar';
import useNav from '../hooks/useNav';
import { getAvatarBoyDefault, getAvatarGirlDefault } from '../reducers/avatar';
import { Routes } from '../Routes';
import { GenderT } from '../types/user';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import WizardHeading from '../ui/WizardHeading';
import {
  ANALYTICS_ONBOARDING_1_START_ONBOARDING,
  ANALYTICS_ONBOARDING_2_SELECT_CHARACTER,
} from '../utils/googleEvents';
import { normalize } from '../utils/normalizeSizes';
import styled from '../utils/theme/styledComponents';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const AvatarWrapper = styled.View`
  margin-left: 5px;
  margin-right: 5px;
  width: ${normalize(150)};
  align-items: center;
`;

const WizardAvatar: FC = () => {
  const { t } = useTranslation('wizardAvatar');
  const dispatch = useDispatch();
  const { navigate } = useNav();
  const avatarBoyDefault = getAvatarBoyDefault();
  const avatarGirlDefault = getAvatarGirlDefault();

  const handleClick = (gender: GenderT): void => {
    dispatch(setUserGender(gender));
    dispatch(setDefaultAvatar(gender));
    navigate(Routes.WizardName);
  };

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_ONBOARDING_1_START_ONBOARDING));
    dispatch(trackUserPath(ANALYTICS_ONBOARDING_2_SELECT_CHARACTER));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avatarWidth = Dimensions.get('window').width * 0.5;
  return (
    <Screen withHeader={false} qaID="WIZARD_AVATAR">
      <WizardHeading>{t('title')}</WizardHeading>
      <Wrapper>
        <AvatarWrapper>
          <Pressable onPress={() => handleClick(GenderT.MALE)}>
            <GenericAvatar avatar={avatarBoyDefault} gender={GenderT.MALE} width={avatarWidth} />
          </Pressable>
          <Button dark onPress={() => handleClick(GenderT.MALE)} qaID="GENDER_MALE">
            {t('shared:buttons.male')}
          </Button>
        </AvatarWrapper>

        <AvatarWrapper>
          <Pressable onPress={() => handleClick(GenderT.FEMALE)}>
            <GenericAvatar avatar={avatarGirlDefault} gender={GenderT.FEMALE} width={avatarWidth} />
          </Pressable>
          <Button dark onPress={() => handleClick(GenderT.FEMALE)} qaID="GENDER_FEMALE">
            {t('shared:buttons.female')}
          </Button>
        </AvatarWrapper>
      </Wrapper>
    </Screen>
  );
};

export default WizardAvatar;
