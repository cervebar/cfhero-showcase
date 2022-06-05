import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Platform } from 'react-native';

import { iconFb, iconIg, iconPartneri } from '../../../assets/images/Images';
import Button from '../../ui/Button';
import { ImageFitWidth } from '../../ui/ImageFitWidth';
import ScaleWrapper from '../../ui/ScaleWrapper';
import Screen from '../../ui/Screen';
import Spacer from '../../ui/Spacer';
import Text from '../../ui/Text';
import { localizeImage } from '../../utils/localization/imageLocalization';
import styled from '../../utils/theme/styledComponents';

const AboutWrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

const AlignLeft = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const IconSocial = styled.Image.attrs({ resizeMode: 'contain' })`
  width: 70px;
  height: 70px;
`;

const SocialIconsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export function AboutScreen() {
  const { t, i18n } = useTranslation('about');

  return (
    <Screen headerTitle={t('title')} withScrollView>
      <AboutWrapper>
        <AlignLeft>
          <Text size="h3" family="bold">
            {t('appVersion')}
          </Text>
          <Text size="micro">{t('checkUpdates')}</Text>
        </AlignLeft>
        <Button
          dark
          borderless
          width={250}
          onPress={() =>
            Linking.openURL(Platform.OS === 'ios' ? t('appStoreLink') : t('playStoreLink'))
          }>
          {Platform.OS === 'ios' ? t('appStore') : t('playStore')}
        </Button>
        <Spacer padding={20} />
        <AlignLeft>
          <Text size="h3" family="bold">
            {t('aboutUs')}
          </Text>
          <Text size="micro">{t('moreInfo')}</Text>
        </AlignLeft>
        <Button dark borderless onPress={() => Linking.openURL(t('moreInfoLink'))} width={250}>
          {t('moreInfoButton')}
        </Button>
        <Spacer padding={20} />
        <AlignLeft>
          <Text size="micro">{t('stayInTouch')}</Text>
        </AlignLeft>

        <SocialIconsRow>
          <ScaleWrapper onPress={() => Linking.openURL(t('igLink'))}>
            <IconSocial source={iconIg} />
          </ScaleWrapper>
          <ScaleWrapper onPress={() => Linking.openURL(t('fbLink'))}>
            <IconSocial source={iconFb} />
          </ScaleWrapper>
        </SocialIconsRow>
        <Spacer padding={20} />
        <AlignLeft>
          <Text size="h3" family="bold">
            {t('partners')}
          </Text>
        </AlignLeft>
        <ImageFitWidth
          source={localizeImage(iconPartneri)}
          height={i18n.language === 'pl' ? 150 : undefined}
        />
      </AboutWrapper>
    </Screen>
  );
}
