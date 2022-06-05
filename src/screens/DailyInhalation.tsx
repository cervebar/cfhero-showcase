import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { setDailyPlannedInhalations } from '../actions/inhalation';
import { INHALATION_MAX_COUNT, INHALATION_MIN_COUNT } from '../containers/inhalation/constants';
import { useDailyPlannedInhalations } from '../hooks/useDailyPlannedInhalations';
import useNav from '../hooks/useNav';
import { selector } from '../packages/automationSelectors';
import { Routes } from '../Routes';
import { ButtonWrapper, ContentWrapper } from '../ui/BasicLayoutComponents';
import Button from '../ui/Button';
import NumberSelector from '../ui/NumberSelector';
import { SausagesIndicator } from '../ui/SausagesIndicator';
import Screen from '../ui/Screen';
import WithAvatarWrapper from '../ui/WithAvatarWrapper';
import { normalize } from '../utils/normalizeSizes';
import styled from '../utils/theme/styledComponents';

const ToCenterWrapper = styled.View`
  right: ${normalize(25)};
`;

const SausagesExampleWrapper = styled.View`
  align-items: center;
`;

const DailyInhalation = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('dailyInhalation');
  const { navigate } = useNav();
  const inhalationCount = useDailyPlannedInhalations();
  const [value, setValue] = useState(inhalationCount);

  const handleMinusPress = useCallback(() => {
    setValue(v => (v > INHALATION_MIN_COUNT ? v - 1 : INHALATION_MIN_COUNT));
  }, [setValue]);

  const handlePlusPress = useCallback(() => {
    setValue(v => (v < INHALATION_MAX_COUNT ? v + 1 : INHALATION_MAX_COUNT));
  }, [setValue]);

  const handleConfirmPress = useCallback(() => {
    dispatch(setDailyPlannedInhalations(value));
    navigate(Routes.DailyInhalationAbsolved);
  }, [navigate, dispatch, value]);

  return (
    <Screen withHeader={true} headerTitle={t('title')} qaID="DAILY_INHALATION">
      <SausagesExampleWrapper>
        <SausagesIndicator
          border
          inhalations={value}
          done={0}
          {...selector('DAILY_INHALATION_EXAMPLE')}
        />
      </SausagesExampleWrapper>
      <ContentWrapper>
        <WithAvatarWrapper>
          <ToCenterWrapper>
            <NumberSelector
              value={value}
              handleMinusPress={handleMinusPress}
              minusDisabled={value <= INHALATION_MIN_COUNT}
              handlePlusPress={handlePlusPress}
              plusDisabled={value >= INHALATION_MAX_COUNT}
            />
          </ToCenterWrapper>
        </WithAvatarWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <Button dark onPress={handleConfirmPress} qaID="SUBMIT_DAILY_INHALATIONS">
          {t('shared:buttons.continue')}
        </Button>
      </ButtonWrapper>
    </Screen>
  );
};

export default DailyInhalation;
