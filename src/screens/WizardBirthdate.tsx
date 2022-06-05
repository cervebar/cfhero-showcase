import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import { setUserBirthdate } from '../actions/user';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { ButtonWrapper } from '../ui/BasicLayoutComponents';
import Button from '../ui/Button';
import DatePicker from '../ui/DatePicker';
import Screen from '../ui/Screen';
import WizardHeading from '../ui/WizardHeading';
import { ANALYTICS_ONBOARDING_4_SET_BIRTHDAY } from '../utils/googleEvents';
import { DAY_DEFAULT, MONTH_DEFAULT } from '../utils/pickerData';

const WizardBirthdate: FC = () => {
  const { t } = useTranslation('wizardBirthdate');
  const dispatch = useDispatch();
  const { navigate } = useNav();

  const [date, setDate] = useState({ day: DAY_DEFAULT, month: MONTH_DEFAULT });

  type handleSetDateT = ({ month, day }: { month: number; day: number }) => void;
  const handleSetDate: handleSetDateT = ({ month, day }) => {
    setDate({ month, day });
  };

  const handleClick = (): void => {
    dispatch(
      setUserBirthdate({
        day: date.day,
        month: date.month,
      }),
    );
    navigate(Routes.WizardAge);
  };

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_ONBOARDING_4_SET_BIRTHDAY));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen withHeader={false} qaID="WIZARD_BIRTHDATE" verticalSpacing>
      <WizardHeading>{t('title')}</WizardHeading>
      <DatePicker
        onInit={handleSetDate}
        onChange={handleSetDate}
        dayDefault={DAY_DEFAULT}
        monthDefault={MONTH_DEFAULT}
      />
      <ButtonWrapper>
        <Button dark onPress={handleClick} qaID="SUBMIT_BIRTHDATE">
          {t('shared:buttons.continue')}
        </Button>
      </ButtonWrapper>
    </Screen>
  );
};

export default WizardBirthdate;
