import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RootStateType } from '../reducers/rootReducers';
import { BirthdateT } from '../types/user';
import { getAgeFromBirthdate } from '../utils/getAgeFromBirthdate';
import WizardAdultAgreement from './WizardAdultAgreement';
import WizardUnderAgeParent from './WizardUnderAgeParent';

const AGE_DEFAULT = 10;

const WizardDataCollection: FC = () => {
  const { t } = useTranslation('adultAge');
  const birthdate = useSelector<RootStateType, BirthdateT | undefined>(
    state => state.user.birthdate,
  );

  const adultAge = Number(t('value'));

  const age = useMemo(() => {
    if (birthdate && birthdate.year && birthdate.month && birthdate.day) {
      const { year, month, day } = birthdate;
      return getAgeFromBirthdate(new Date(year, month - 1, day));
    }
    return AGE_DEFAULT;
  }, [birthdate]);

  const wizard =
    age >= adultAge ? <WizardAdultAgreement /> : <WizardUnderAgeParent adultAge={adultAge} />;
  return wizard;
};

export default WizardDataCollection;
