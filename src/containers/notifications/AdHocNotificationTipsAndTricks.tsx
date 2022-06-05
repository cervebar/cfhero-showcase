import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setContactAgreementPermission } from '../../actions/user';
import { RootStateType } from '../../reducers/rootReducers';
import { isContactAgreementEnabled } from '../../selectors/application';
import { TIPS_TRICKS } from '../../types/notifications';
import { AdHocNotification } from './AdHocNotification';

export const AdHocNotificationTipsAndTricks = () => {
  const dispatch = useDispatch();
  const contactAgreementEnabled = useSelector<RootStateType, boolean>(isContactAgreementEnabled);

  const onToggle = (value: boolean) => {
    dispatch(setContactAgreementPermission(value));
  };

  return (
    <AdHocNotification
      key={TIPS_TRICKS}
      textKey="tipsAndTricks"
      defaultToggleValue={contactAgreementEnabled}
      onToggleSpecific={onToggle}
    />
  );
};
