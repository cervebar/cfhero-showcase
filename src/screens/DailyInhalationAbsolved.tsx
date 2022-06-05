import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { setInhalationTourStep } from '../actions/application';
import { addInitialInhalationsCount } from '../actions/inhalation';
import { initNotificationSettings } from '../actions/notifications';
import { useDailyPlannedInhalations } from '../hooks/useDailyPlannedInhalations';
import useMyState from '../hooks/useMyState';
import useNav from '../hooks/useNav';
import { selector } from '../packages/automationSelectors';
import { Routes } from '../Routes';
import { InhalationTourStep } from '../types/application';
import { ButtonWrapper, ContentWrapper } from '../ui/BasicLayoutComponents';
import Button from '../ui/Button';
import NumberSelector from '../ui/NumberSelector';
import { SausagesIndicator } from '../ui/SausagesIndicator';
import Screen from '../ui/Screen';
import Text from '../ui/Text';
import WithAvatarWrapper from '../ui/WithAvatarWrapper';
import { getScaledDefaultFontSize } from '../utils/getDiaryFontSizeByRatio';
import { normalize } from '../utils/normalizeSizes';
import {
  INITIAL_GOTO_NOTIFICATIONS_REMINDER_NOTIFICATION,
  getInitialNotificationValues,
} from '../utils/notifications';
import { scheduleNotification } from '../utils/scheduleNotification';
import styled from '../utils/theme/styledComponents';

const ToCenterWrapper = styled.View`
  right: ${normalize(30)};
`;

const SubtitleWrapper = styled.View`
  position: absolute;
  bottom: 100px;
  right: ${normalize(0)};
  left: ${normalize(130)};
`;

const SubtitleTextWrapper = styled.View`
  width: 85%;
`;

const SausagesExampleWrapper = styled.View`
  align-items: center;
`;

const DailyInhalationAbsolved = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('dailyInhalationAbsolved');
  const { navigate } = useNav();

  const plannedInhalations = useDailyPlannedInhalations();
  const todayInhalationsLimit = plannedInhalations - 1;
  const userBirthDate = useMyState(state => state.user.birthdate);

  const [value, setValue] = useState(1);
  const handleMinusPress = useCallback(() => setValue(v => Math.max(0, v - 1)), [setValue]);
  const handlePlusPress = useCallback(
    () => setValue(v => Math.min(todayInhalationsLimit, v + 1)),
    [setValue, todayInhalationsLimit],
  );

  const goNext = useCallback(() => {
    dispatch(setInhalationTourStep(InhalationTourStep.prepareInhalator));
    navigate(Routes.FirstInhalationPrepareInhalator);
  }, [dispatch, navigate]);

  const handleConfirmPress = useCallback(async () => {
    await scheduleNotification(INITIAL_GOTO_NOTIFICATIONS_REMINDER_NOTIFICATION);
    dispatch(addInitialInhalationsCount(value));
    dispatch(
      initNotificationSettings(getInitialNotificationValues(userBirthDate, plannedInhalations)),
    );

    goNext();
  }, [dispatch, goNext, plannedInhalations, userBirthDate, value]);

  useEffect(() => {
    if (!todayInhalationsLimit) goNext();
  }, [todayInhalationsLimit, goNext]);

  const scaledDefaultFontSize = getScaledDefaultFontSize();

  return (
    <Screen withHeader={true} headerTitle={t('title')} qaID="DAILY_INHALATION_ABSOLVED">
      <SausagesExampleWrapper>
        <SausagesIndicator
          border
          inhalations={plannedInhalations}
          done={value}
          {...selector('DAILY_INHALATION_EXAMPLE')}
        />
      </SausagesExampleWrapper>
      <ContentWrapper>
        <WithAvatarWrapper>
          <ToCenterWrapper>
            <NumberSelector
              value={value}
              handleMinusPress={handleMinusPress}
              minusDisabled={value <= 0}
              handlePlusPress={handlePlusPress}
              plusDisabled={value >= todayInhalationsLimit}
            />
          </ToCenterWrapper>
        </WithAvatarWrapper>
      </ContentWrapper>
      <SubtitleWrapper>
        <SubtitleTextWrapper>
          <Text size={scaledDefaultFontSize} lineHeight={1.2}>
            {t('subtitle')}
          </Text>
        </SubtitleTextWrapper>
      </SubtitleWrapper>
      <ButtonWrapper>
        <Button dark onPress={handleConfirmPress} qaID="SUBMIT_DAILY_ABSOLVED_INHALATIONS">
          {t('shared:buttons.continue')}
        </Button>
      </ButtonWrapper>
    </Screen>
  );
};

export default DailyInhalationAbsolved;
