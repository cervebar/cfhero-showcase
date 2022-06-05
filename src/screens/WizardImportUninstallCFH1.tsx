import React from 'react';
import { useTranslation } from 'react-i18next';

import { iconDeleteCFH1 } from '../../assets/images/Images';
import { usePreventHardwareBackPressNavigationPop } from '../hooks/useHandleHardwareBackPress';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { BoxWrapper } from '../ui/BoxWrapper';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import Text from '../ui/Text';
import { H3Text } from '../ui/Texts';
import styled from '../utils/theme/styledComponents';
import { SHOW_CFH2_UPGRADE_MODAL_PARAMETER } from './Home';

export const WizardImportUninstallCFH1 = () => {
  const { navigate } = useNav();
  const { t } = useTranslation('wizardImportUninstallCFH1');

  usePreventHardwareBackPressNavigationPop();

  return (
    <Screen
      withHeader={false}
      withBackButton={false}
      bottomRightOverlayContent={
        <Button
          dark
          borderless
          onPress={() =>
            navigate(Routes.Home, {
              [SHOW_CFH2_UPGRADE_MODAL_PARAMETER]: true,
            })
          }>
          {t('shared:buttons.understood')}
        </Button>
      }>
      <BoxWrapper fullWidth>
        <H3Text family="bold" align="left">
          {t('title')}
        </H3Text>
        <Spacer padding={15} />
        <Text>{t('uninstallCFH1')}</Text>
        <Spacer padding={15} />
        <Text>{t('newOnlyInCFH2')}</Text>
        <Spacer padding={15} />
        <UninstallIcon />
      </BoxWrapper>
    </Screen>
  );
};

const UninstallIcon = styled.Image.attrs({ source: iconDeleteCFH1, resizeMode: 'contain' })`
  width: 80px;
  height: 80px;
`;
