import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import GenericAvatar from '../containers/genericAvatar/GenericAvatar';
import useNav from '../hooks/useNav';
import { getAvatarBoyDefault, getAvatarGirlDefault } from '../reducers/avatar';
import { Routes } from '../Routes';
import { GenderT } from '../types/user';
import { BoxWrapper } from '../ui/BoxWrapper';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import Text from '../ui/Text';
import { getScaledH1FontSize } from '../utils/getDiaryFontSizeByRatio';
import styled from '../utils/theme/styledComponents';

const WizardNewWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Avatars = styled.View`
  position: absolute;
  top: -50px;
  justify-content: space-around;
  flex-direction: row;
`;

const ContentCard = styled(BoxWrapper)`
  z-index: 10;
  margin-top: 50px;
`;

const WizardNew = () => {
  const { navigate } = useNav();
  const { t } = useTranslation('wizardNew');
  const avatar1 = useMemo(() => getAvatarBoyDefault(), []);
  const avatar2 = useMemo(() => getAvatarGirlDefault(), []);

  return (
    <Screen withHeader={true} headerTitle={t('title')} withBackButton={false}>
      <WizardNewWrapper>
        <Avatars>
          <GenericAvatar avatar={avatar1} gender={GenderT.MALE} />
          <GenericAvatar avatar={avatar2} gender={GenderT.FEMALE} />
        </Avatars>

        <ContentCard>
          <View>
            <Text size={getScaledH1FontSize()}>{t('alreadyAUser')}</Text>
          </View>

          <View>
            <Text size="small">{t('restorePrompt')}</Text>
          </View>

          <View>
            <Button onPress={() => navigate(Routes.WizardImport)} dark width={240}>
              {t('restoreButton')}
            </Button>
            <Button onPress={() => navigate(Routes.WizardAvatar)} width={240}>
              {t('newUserButton')}
            </Button>
          </View>
        </ContentCard>
      </WizardNewWrapper>
    </Screen>
  );
};

export default WizardNew;
