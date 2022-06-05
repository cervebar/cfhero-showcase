import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { checkbox2Checked, checkbox2Unchecked } from '../../assets/images/Images';
import { trackAgreementParent, trackUserPath } from '../actions/tracking';
import {
  setContactAgreementPermission,
  setDataCollectionPermission,
  setFirstTimeUsage,
} from '../actions/user';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { BoxWrapper } from '../ui/BoxWrapper';
import Button from '../ui/Button';
import { CheckBox } from '../ui/CheckBoxStyle';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import Text from '../ui/Text';
import WizardHeading from '../ui/WizardHeading';
import WizardSubheading from '../ui/WizardSubheading';
import { getScaledMicroFontSize as getAgreementMicroFontSize } from '../utils/getAgreementFontSizeByRatio';
import {
  getScaledDefaultFontSize,
  getScaledH2FontSize,
  getScaledMicroFontSize,
} from '../utils/getDiaryFontSizeByRatio';
import { ANALYTICS_ONBOARDING_PARENT_CHECK } from '../utils/googleEvents';
import { normalize } from '../utils/normalizeSizes';
import styled from '../utils/theme/styledComponents';

const AgreementWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const ScreenWrapper = styled.View`
  flex: 1;
  padding-top: ${normalize(15)};
  padding-left: ${normalize(20)};
  padding-right: ${normalize(20)};
`;

const ShapeContent = styled.View`
  flex: 1;
  padding-top: ${normalize(10)};
  justify-content: center;
`;

const CheckboxWrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding-left: ${normalize(5)};
  padding-right: ${normalize(25)};
  width: 100%;
  align-items: flex-start;
`;

const TextWrapper = styled.View`
  width: 100%;
`;

const InstructionsTextWrapper = styled(Text)`
  padding-top: ${normalize(10)};
`;

const WizardUnderAgeAgreement: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('wizardDataCollectionUnderAge');
  const { navigate } = useNav();
  const [requiredAgreementCheck, setRequiredAgreementCheck] = useState<boolean>(false);
  const [optionalAgreementCheck, setOptionalAgreementCheck] = useState<boolean>(false);

  const handleAgreementClick = (): void => {
    dispatch(
      trackAgreementParent({
        dataCollectionAgreement: true,
        contactAgreementPermission: optionalAgreementCheck,
      }),
    );
    dispatch(setDataCollectionPermission(true));
    dispatch(setContactAgreementPermission(optionalAgreementCheck));
    dispatch(setFirstTimeUsage());
    navigate(Routes.WizardUnderAgeParentEmail);
  };

  const scaledDefaultFontSize = getScaledDefaultFontSize();
  const scaledMicroFontSize = getScaledMicroFontSize();
  const agreementMicroFontSize = getAgreementMicroFontSize();
  const scaledH2FontSize = getScaledH2FontSize();

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_ONBOARDING_PARENT_CHECK));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen
      withHeader={false}
      qaID="WIZARD_ADULT_DATA_COLLECTION"
      withContainer={false}
      withScrollView>
      <ScreenWrapper>
        <WizardHeading align="left" size={scaledH2FontSize}>
          {t('title')}
        </WizardHeading>
        <WizardSubheading align="left" size={agreementMicroFontSize}>
          {t('subtitle')}
        </WizardSubheading>
        <AgreementWrapper>
          <BoxWrapper>
            <ShapeContent>
              <Text family="myriadBold" size={scaledMicroFontSize} align="left">
                {t('agreementTitle')}
              </Text>
              <Spacer padding={5} />
              <CheckboxWrapper onPress={() => setRequiredAgreementCheck(!requiredAgreementCheck)}>
                <CheckBox
                  source={requiredAgreementCheck ? checkbox2Checked : checkbox2Unchecked}
                  resizeMode="contain"
                />
                <TextWrapper>
                  <Text size={scaledDefaultFontSize} align="left">
                    {t('agreement1_title')}
                  </Text>
                  <Spacer padding={2} />
                  <Text family="myriad" size={scaledMicroFontSize} align="left">
                    {t('agreement1_subtitle')}
                  </Text>
                </TextWrapper>
              </CheckboxWrapper>
              <Spacer padding={5} />
              <CheckboxWrapper onPress={() => setOptionalAgreementCheck(!optionalAgreementCheck)}>
                <CheckBox
                  source={optionalAgreementCheck ? checkbox2Checked : checkbox2Unchecked}
                  resizeMode="contain"
                />
                <TextWrapper>
                  <Text size={scaledDefaultFontSize} align="left">
                    {t('agreement2_title')}
                  </Text>
                  <Spacer padding={2} />
                  <Text family="myriad" size={scaledMicroFontSize} align="left">
                    {t('agreement2_subtitle')}
                  </Text>
                </TextWrapper>
              </CheckboxWrapper>
              <Spacer padding={5} />
              <InstructionsTextWrapper>
                <Text family="myriad" size={scaledMicroFontSize} align="left">
                  {t('instructions')}
                </Text>{' '}
                <Text
                  family="myriad"
                  size={scaledMicroFontSize}
                  underline
                  align="left"
                  onPress={() => navigate(Routes.WizardConditions)}>
                  {t('instructions_conditions')}
                </Text>
              </InstructionsTextWrapper>
              <Button
                dark
                disabled={!requiredAgreementCheck}
                marginTop={20}
                onPress={handleAgreementClick}
                qaID="ACCEPT_DATA_COLLECTION">
                {t('buttonTitle')}
              </Button>
            </ShapeContent>
          </BoxWrapper>
        </AgreementWrapper>
      </ScreenWrapper>
    </Screen>
  );
};

export default WizardUnderAgeAgreement;
