import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { acceptGift } from '../actions/balance';
import { trackUserPath } from '../actions/tracking';
import { GIFTED_OXYGEN_AMOUNT } from '../constants/balance';
import useNav from '../hooks/useNav';
import { RootStateType } from '../reducers/rootReducers';
import { Routes } from '../Routes';
import { BackgroundAvatar } from '../ui/BackgroundAvatar';
import { BoxWrapper } from '../ui/BoxWrapper';
import Button from '../ui/Button';
import { CenterVertically } from '../ui/CenterVertically';
import { OxygensCount } from '../ui/OxygensCount';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import Text from '../ui/Text';
import { ANALYTICS_ONBOARDING_6_GIFT_PAGE } from '../utils/googleEvents';

const WizardGift: FC = () => {
  const { t } = useTranslation('wizardGift');
  const { navigate } = useNav();
  const dispatch = useDispatch();
  const [giftReceived, setGiftReceived] = useState(false);
  const currentBalance = useSelector<RootStateType, number>(state => state.balance.balance);

  const handleOkClick = (): void => {
    if (!giftReceived && currentBalance === 0) {
      dispatch(acceptGift());
      setGiftReceived(true);
    }
    navigate(Routes.WizardDataCollection);
  };

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_ONBOARDING_6_GIFT_PAGE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen withHeader={false} qaID="WIZARD_GIFT" verticalSpacing>
      <CenterVertically>
        <BoxWrapper>
          <Text size="h2" family="bold">
            {t('title')}
          </Text>
          <Spacer padding={10} />
          <Text size="default" family="bold">
            {t('content', { amount: GIFTED_OXYGEN_AMOUNT })}
          </Text>
          <Spacer padding={10} />
          <OxygensCount count={GIFTED_OXYGEN_AMOUNT} qaID="GIFTED_OXYGEN_AMOUNT" />
          <Button dark onPress={handleOkClick} qaID="SUBMIT_GIFT">
            {t('shared:buttons.ok')}
          </Button>
        </BoxWrapper>
        <BackgroundAvatar />
      </CenterVertically>
    </Screen>
  );
};

export default WizardGift;
