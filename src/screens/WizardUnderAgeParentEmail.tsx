import * as EmailValidator from 'email-validator';
import i18next from 'i18next';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import { setContactEmail } from '../actions/user';
import useNav from '../hooks/useNav';
import { RootStateType } from '../reducers/rootReducers';
import { Routes } from '../Routes';
import { BoxWrapper } from '../ui/BoxWrapper';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import Text from '../ui/Text';
import TextInputWithoutFormik from '../ui/TextInputWithoutFormik';
import WizardHeading from '../ui/WizardHeading';
import WizardSubheading from '../ui/WizardSubheading';
import { addEmailToSendTerms } from '../utils/firestore/emails';
import { getScaledH2FontSize, getScaledMicroFontSize } from '../utils/getDiaryFontSizeByRatio';
import {
  ANALYTICS_ONBOARDING_PARENT_EMAIL_FILL,
  ANALYTICS_ONBOARDING_PARENT_EMAIL_SCREEN,
  ANALYTICS_ONBOARDING_PARENT_EMAIL_SKIP,
} from '../utils/googleEvents';
import styled from '../utils/theme/styledComponents';

const FormWrapper = styled(BoxWrapper)`
  width: 100%;
`;

const EmailInput = styled(TextInputWithoutFormik)`
  width: 100%;
  height: 60px;
  border: 2px solid ${({ theme }) => theme.colors.darkBlue};
`;

const WizardUnderAgeParentEmail: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('wizardUnderAgeParentEmail');
  const { navigate } = useNav();
  const [emailFilled, setEmailFilled] = useState<boolean>(false);
  const [showValidationFailed, setShowValidationFailed] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const userId = useSelector<RootStateType, string | undefined>(state => state.user.id);
  const contactAgreementEnabled = useSelector<RootStateType, boolean>(
    state => state.user.contactAgreementEnabled,
  );

  const isProdEnv = Config.IS_DEVELOP === 'false';

  const handleNavigateToHome = (): void => {
    dispatch(trackUserPath(ANALYTICS_ONBOARDING_PARENT_EMAIL_SKIP));
    navigate(Routes.Home, { firstTime: true });
  };

  const handleSetEmail = (): void => {
    if (EmailValidator.validate(email)) {
      dispatch(setContactEmail(email));
      addEmailToSendTerms(email, contactAgreementEnabled, isProdEnv, userId, i18next.language);
      dispatch(trackUserPath(ANALYTICS_ONBOARDING_PARENT_EMAIL_FILL));
      navigate(Routes.Home, { firstTime: true });
    } else {
      setShowValidationFailed(true);
    }
  };

  const scaledMicroFontSize = getScaledMicroFontSize();
  const scaledH2FontSize = getScaledH2FontSize();

  const handleChangeText = (text: string): void => {
    setShowValidationFailed(false);
    if (text && text.length) {
      setEmailFilled(true);
      setEmail(text);
    } else {
      setEmailFilled(false);
    }
  };

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_ONBOARDING_PARENT_EMAIL_SCREEN));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen withHeader={false} qaID="WIZARD_ADULT_DATA_COLLECTION" withScrollView>
      <WizardHeading size={scaledH2FontSize} align="left">
        {t('title')}
      </WizardHeading>
      <WizardSubheading size={scaledMicroFontSize} align="left">
        {t('subtitle1')}
      </WizardSubheading>
      <WizardSubheading size={scaledMicroFontSize} align="left">
        {t('subtitle2')}
      </WizardSubheading>
      <Spacer padding={5} />
      <FormWrapper>
        <EmailInput
          onChangeText={handleChangeText}
          autoCapitalize="words"
          maxLength={50}
          placeholder={t('emailTitle')}
        />
        {showValidationFailed && (
          <Text size={scaledMicroFontSize} align="left" family="myriad" color="red">
            {t('emailValidationFailed')}
          </Text>
        )}
        <Spacer padding={5} />
        <Text size={scaledMicroFontSize} align="left" family="myriad">
          {t('emailSubtitle')}
        </Text>
        <Button dark disabled={!emailFilled} onPress={handleSetEmail} qaID="ACCEPT_DATA_COLLECTION">
          {t('buttonConfirm')}
        </Button>
      </FormWrapper>
      <Button borderless onPress={handleNavigateToHome} qaID="ACCEPT_DATA_COLLECTION">
        {t('buttonSkip')}
      </Button>
    </Screen>
  );
};

export default WizardUnderAgeParentEmail;
