import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HTML from 'react-native-render-html';
import { useDispatch } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import useNav from '../hooks/useNav';
import { BoxWrapper } from '../ui/BoxWrapper';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import Text from '../ui/Text';
import { ANALYTICS_VIEW_SETTINGS_TERMS_AND_CONDITIONS } from '../utils/googleEvents';
import styled from '../utils/theme/styledComponents';

const ConditionsWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ConditionsContent = styled.ScrollView`
  padding-right: 7px;
`;

const ConditionsContentWrapper = styled(BoxWrapper)`
  flex: 1;
`;

const WizardConditions: FC = () => {
  const { t } = useTranslation('wizardConditions');
  const { goBack } = useNav();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_VIEW_SETTINGS_TERMS_AND_CONDITIONS));
  }, [dispatch]);

  return (
    <Screen withHeader={false} qaID="WIZARD_CONDITIONS">
      <ConditionsWrapper>
        <ConditionsContentWrapper>
          <ConditionsContent showsVerticalScrollIndicator={true}>
            <Text size="default" align="left" family="bold">
              {t('title')}
            </Text>
            <Spacer padding={7} />
            <HTML
              html={t('html')}
              tagsStyles={{
                h2: {
                  fontFamily: 'MyriadPro-Regular',
                  marginBottom: 10,
                },
                p: {
                  fontFamily: 'MyriadPro-Regular',
                  marginBottom: 10,
                },
                ul: {
                  fontFamily: 'MyriadPro-Regular',
                  marginBottom: 0,
                },
              }}
              classesStyles={{
                subchapterCounter: {
                  marginBottom: 5,
                  fontFamily: 'MyriadPro-Regular',
                  fontWeight: 'bold',
                },
                subchapter: {
                  marginBottom: 10,
                  fontFamily: 'MyriadPro-Regular',
                },
                chapter: {
                  fontWeight: 'bold',
                },
                rules: {
                  marginTop: 10,
                },
              }}
            />
            <Spacer padding={5} />
          </ConditionsContent>
        </ConditionsContentWrapper>
        <Button dark onPress={() => goBack()} qaID="ACCEPT_DATA_COLLECTION">
          {t('buttonTitle')}
        </Button>
      </ConditionsWrapper>
    </Screen>
  );
};

export default WizardConditions;
