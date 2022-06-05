import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { WEEKEND_CATEGORY, WORKDAYS_CATEGORY } from '../../types/notifications';
import Text from '../../ui/Text';
import { normalize } from '../../utils/normalizeSizes';
import styled from '../../utils/theme/styledComponents';
import { AdHocNotificationPlanFulfillment } from './AdHocNotificationPlanFulfillment';
import { AdHocNotificationTipsAndTricks } from './AdHocNotificationTipsAndTricks';
import { NotificationInhalationCategory } from './NotificationInhalationCategory';

const HeaderText = styled(Text)`
  text-align: left;
  font-family: ${({ theme }) => theme.font.family.myriad};
  font-size: ${normalize(16)};
  text-transform: uppercase;
`;

type NotificationContentT = FC<{}>;

export const NotificationContent: NotificationContentT = () => {
  const { t } = useTranslation('notificationSettings');
  return (
    <>
      <HeaderText size="h1" color="darkBlue">
        {t('reminder')}
      </HeaderText>
      <NotificationInhalationCategory category={WORKDAYS_CATEGORY} />
      <NotificationInhalationCategory category={WEEKEND_CATEGORY} />
      <HeaderText size="h1" color="darkBlue">
        {t('otherReminders')}
      </HeaderText>
      <AdHocNotificationTipsAndTricks />
      <AdHocNotificationPlanFulfillment />
    </>
  );
};
