import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import GenericAvatar from '../containers/genericAvatar/GenericAvatar';
import StoreFirstVisitModal from '../containers/store/StoreFirstVisitModal';
import { StoreNav } from '../containers/store/StoreNav';
import Screen from '../ui/Screen';
import { ANALYTICS_VIEW_ITEMS_SHOP } from '../utils/googleEvents';
import styled from '../utils/theme/styledComponents';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const AvatarWrapper = styled.View`
  align-items: center;
`;

export const StoreScreen: FC = () => {
  const { t } = useTranslation('store');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_VIEW_ITEMS_SHOP));
  }, [dispatch]);

  return (
    <>
      <Screen gradient="shop" headerTitle={t('title')} rightBalance qaID="STORE">
        <Wrapper>
          <StoreNav />
          <AvatarWrapper>
            <GenericAvatar />
          </AvatarWrapper>
        </Wrapper>
      </Screen>

      <StoreFirstVisitModal />
    </>
  );
};
