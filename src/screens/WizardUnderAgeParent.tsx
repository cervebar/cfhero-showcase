import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { BackgroundAvatar } from '../ui/BackgroundAvatar';
import { BoxWrapper } from '../ui/BoxWrapper';
import Button from '../ui/Button';
import { CenterVertically } from '../ui/CenterVertically';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import Text from '../ui/Text';

const WizardUnderAgeParent: FC<{ adultAge: number }> = ({ adultAge }) => {
  const { t } = useTranslation('wizardUnderAgeParent');
  const { navigate } = useNav();

  const handleOkClick = (): void => {
    navigate(Routes.WizardUnderAgeAgreement);
  };

  return (
    <Screen withHeader={false} qaID="WIZARD_UNDER_AGE_PARENT" verticalSpacing>
      <CenterVertically>
        <BoxWrapper>
          <Text size="h2" family="bold">
            {t('title')}
          </Text>
          <Spacer padding={10} />
          <Text size="default" family="bold">
            {t('content', { age: adultAge })}
          </Text>
          <Spacer padding={10} />
          <Button dark onPress={handleOkClick} qaID="SUBMIT_GIFT">
            {t('buttonTitle')}
          </Button>
        </BoxWrapper>
        <BackgroundAvatar />
      </CenterVertically>
    </Screen>
  );
};

export default WizardUnderAgeParent;
