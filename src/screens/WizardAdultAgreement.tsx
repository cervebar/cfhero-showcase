import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useDispatch } from 'react-redux';

import { checkbox2Checked, checkbox2Unchecked } from '../../assets/images/Images';
import { trackAgreement, trackUserPath } from '../actions/tracking';
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
import { getScaledMicroFontSize as agreementScaledMicroFontSize } from '../utils/getAgreementFontSizeByRatio';
import {
  getScaledDefaultFontSize,
  getScaledH2FontSize,
  getScaledMicroFontSize,
} from '../utils/getDiaryFontSizeByRatio';
import { ANALYTICS_ONBOARDING_AGGREEMENT } from '../utils/googleEvents';
import { normalize } from '../utils/normalizeSizes';
import styled from '../utils/theme/styledComponents';

const AgreementWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

const ShapeContent = styled.View`
  flex: 1;
  padding-top: ${normalize(20)};
  justify-content: space-around;
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

const InstructionsWrapper = styled(Text)`
  padding-top: 5px;
`;

const WizardAdultAgreement: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('wizardDataCollectionAdult');
  const { navigate } = useNav();
  const [requiredAgreementCheck, setRequiredAgreementCheck] = useState<boolean>(false);
  const [optionalAgreementCheck, setOptionalAgreementCheck] = useState<boolean>(false);

  const handleNavigateToHome = (): void => {
    dispatch(
      trackAgreement({
        dataCollectionAgreement: true,
        contactAgreementPermission: optionalAgreementCheck,
      }),
    );
    dispatch(setDataCollectionPermission(true));
    dispatch(setContactAgreementPermission(optionalAgreementCheck));
    dispatch(setFirstTimeUsage());
    navigate(Routes.Home, { firstTime: true });
  };

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_ONBOARDING_AGGREEMENT));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scaledDefaultFontSize = getScaledDefaultFontSize();
  const scaledMicroFontSize = getScaledMicroFontSize();
  const scaledH2FontSize = getScaledH2FontSize();

  return (
    <Screen withHeader={false} qaID="WIZARD_ADULT_DATA_COLLECTION">
      <WizardHeading size={scaledH2FontSize} align="left">
        {t('title')}
      </WizardHeading>
      <WizardSubheading
        size={isIphoneX() ? agreementScaledMicroFontSize() : scaledMicroFontSize}
        align="left">
        {t('subtitle')}
      </WizardSubheading>
      <Spacer padding={15} />
      <AgreementWrapper>
        <BoxWrapper>
          <ShapeContent>
            <Text
              family="myriadBold"
              align="left"
              size={isIphoneX() ? agreementScaledMicroFontSize() : scaledMicroFontSize}>
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
                <Text
                  family="myriad"
                  size={isIphoneX() ? agreementScaledMicroFontSize() : scaledMicroFontSize}
                  align="left">
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
                <Text
                  family="myriad"
                  size={isIphoneX() ? agreementScaledMicroFontSize() : scaledMicroFontSize}
                  align="left">
                  {t('agreement2_subtitle')}
                </Text>
              </TextWrapper>
            </CheckboxWrapper>
            <Spacer padding={5} />
            <InstructionsWrapper>
              <Text
                family="myriad"
                align="left"
                size={isIphoneX() ? agreementScaledMicroFontSize() : scaledMicroFontSize}>
                {t('instructions')}
              </Text>
              {'\n'}
              <Text
                family="myriad"
                size={isIphoneX() ? agreementScaledMicroFontSize() : scaledMicroFontSize}
                underline
                align="left"
                onPress={() => navigate(Routes.WizardConditions)}>
                {t('instructions_conditions')}
              </Text>
            </InstructionsWrapper>
            <Spacer padding={10} />
            <Button
              dark
              disabled={!requiredAgreementCheck}
              marginTop={0}
              onPress={handleNavigateToHome}
              qaID="ACCEPT_DATA_COLLECTION">
              {t('buttonTitle')}
            </Button>
            <Spacer padding={10} />
          </ShapeContent>
        </BoxWrapper>
      </AgreementWrapper>
    </Screen>
  );
};

export default WizardAdultAgreement;
