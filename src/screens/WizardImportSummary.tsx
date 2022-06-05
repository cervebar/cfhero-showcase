import React from 'react';
import { useTranslation } from 'react-i18next';

import GenericAvatar from '../containers/genericAvatar/GenericAvatar';
import { usePreventHardwareBackPressNavigationPop } from '../hooks/useHandleHardwareBackPress';
import useMyState from '../hooks/useMyState';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { Column, Row } from '../ui/BasicLayoutComponents';
import { BoxWrapper } from '../ui/BoxWrapper';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import Text from '../ui/Text';
import { H3Text } from '../ui/Texts';
import styled from '../utils/theme/styledComponents';

export const WizardImportSummary = () => {
  const { navigate } = useNav();
  const { t } = useTranslation('wizardImportSummary');
  const { name, level, oxygens } = useMyState(state => ({
    name: state.user.name,
    level: state.level.level,
    oxygens: state.balance.balance,
  }));

  usePreventHardwareBackPressNavigationPop();

  return (
    <Screen withHeader={false} withBackButton={false}>
      <BoxWrapper>
        <H3Text family="bold" align="left">
          {t('title')}
        </H3Text>
        <Spacer padding={15} />
        <Row style={{ alignSelf: 'flex-start' }}>
          <GenericAvatar width={160} />
          <Summaries>
            <Text family="bold">{t('name')}</Text>
            <Text>{name}</Text>
            <Text family="bold">{t('level')}</Text>
            <Text>{level}</Text>
            <Text family="bold">{t('oxygensCount')}</Text>
            <Text>{oxygens}</Text>
          </Summaries>
        </Row>
        <Button dark borderless onPress={() => navigate(Routes.WizardImportUninstallCFH1)}>
          {t('shared:buttons.continue')}
        </Button>
      </BoxWrapper>
    </Screen>
  );
};

const Summaries = styled(Column)`
  align-items: flex-start;
`;
