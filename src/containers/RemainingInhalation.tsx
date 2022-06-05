import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useDailyPlannedInhalations } from '../hooks/useDailyPlannedInhalations';
import useMyState from '../hooks/useMyState';
import useSubscriptionOnAppStateChange from '../hooks/useSubscriptionOnAppStateChange';
import useSubscriptionOnDateChange from '../hooks/useSubscriptionOnDateChange';
import { selector } from '../packages/automationSelectors';
import { getCompletedInhalations } from '../selectors/inhalation';
import { InhalationTourStep } from '../types/application';
import InhalationIndicator from '../ui/InhalationIndicator';
import Text from '../ui/Text';
import { DefaultText } from '../ui/Texts';
import { getScaledSmallFontSize } from '../utils/getDiaryFontSizeByRatio';
import { normalize } from '../utils/normalizeSizes';
import styled from '../utils/theme/styledComponents';

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: ${normalize(10)};
`;

const SubTitle = styled(Text)`
  line-height: ${({ theme }) => theme.font.size.default};
`;

export const RemainingInhalation = () => {
  const { t } = useTranslation('header');
  useSubscriptionOnAppStateChange();
  useSubscriptionOnDateChange();

  const dailyInhalations = useDailyPlannedInhalations();
  const inhalationTourStep = useMyState(state => state.application.inhalationTourStep);
  const dailyInhalationsCompleted = useMyState(getCompletedInhalations);
  const dailyInhalationsNotSet = inhalationTourStep === InhalationTourStep.inhalationsCount;

  return (
    <Wrapper>
      {dailyInhalationsNotSet ? (
        <View>
          <DefaultText>{t('home:firstTime.title')}</DefaultText>
          <SubTitle size={getScaledSmallFontSize()} family="bold">
            {t('home:firstTime.subTitle')}
          </SubTitle>
        </View>
      ) : (
        <InhalationIndicator inhalations={dailyInhalations} done={dailyInhalationsCompleted} />
      )}
    </Wrapper>
  );
};
