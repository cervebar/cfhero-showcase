import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import { setUserAge } from '../actions/user';
import useNav from '../hooks/useNav';
import { RootStateType } from '../reducers/rootReducers';
import { Routes } from '../Routes';
import { BirthdateT } from '../types/user';
import { ButtonWrapper } from '../ui/BasicLayoutComponents';
import { BoxWrapper } from '../ui/BoxWrapper';
import Button from '../ui/Button';
import Picker from '../ui/Picker';
import Screen from '../ui/Screen';
import WizardHeading from '../ui/WizardHeading';
import getYearByFutureAge from '../utils/getYearByFutureAge';
import { ANALYTICS_ONBOARDING_5_SET_AGE } from '../utils/googleEvents';
import styled from '../utils/theme/styledComponents';

const PickerWrapper = styled.View`
  width: 240px;
`;

const AGE_DEFAULT = 10;
const MINIMAL_AGE = 3;
const MAXIMAL_AGE = 105;
const ageEntries = MAXIMAL_AGE - MINIMAL_AGE + 1;

const ages = [...new Array(ageEntries)].map((_, i) => {
  const age = i + MINIMAL_AGE;
  return { value: age, title: `${age}` };
});

const WizardAge: FC = () => {
  const { t } = useTranslation('wizardAge');
  const birthdate = useSelector<RootStateType, BirthdateT | undefined>(
    state => state.user.birthdate,
  );
  const { navigate } = useNav();
  const dispatch = useDispatch();
  const [age, setAge] = useState(AGE_DEFAULT);

  const handleChangeAge = (value: number): void => {
    setAge(value);
  };

  const handleClick = (): void => {
    if (!birthdate) {
      return;
    }
    dispatch(setUserAge(getYearByFutureAge(birthdate, age)));
    navigate(Routes.WizardGift);
  };

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_ONBOARDING_5_SET_AGE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen withHeader={false} qaID="WIZARD_AGE" verticalSpacing>
      <WizardHeading>{t('title')}</WizardHeading>
      <BoxWrapper>
        <PickerWrapper>
          <Picker
            values={ages}
            defaultValue={AGE_DEFAULT}
            onChange={handleChangeAge}
            qaID="YEARS"
          />
        </PickerWrapper>
      </BoxWrapper>
      <ButtonWrapper>
        <Button dark onPress={handleClick} qaID="SUBMIT_AGE">
          {t('shared:buttons.continue')}
        </Button>
      </ButtonWrapper>
    </Screen>
  );
};

export default WizardAge;
