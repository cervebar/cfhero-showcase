import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { comicShop } from '../../assets/images/Images';
import { trackUserPath } from '../actions/tracking';
import ComicShopContainer from '../containers/comicShop/ComicShopContainer';
import { ComicShopFirstVisitModal } from '../containers/comicShop/ComicShopFirstVisitModal';
import { ComicShopJustOpenedComicsModal } from '../containers/comicShop/ComicShopJustOpenedComicsModal';
import GenericAvatar from '../containers/genericAvatar/GenericAvatar';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import Screen from '../ui/Screen';
import { ANALYTICS_VIEW_COMICS_SHOP } from '../utils/googleEvents';
import styled from '../utils/theme/styledComponents';

const AvatarWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const ComicShop: FC = () => {
  const dispatch = useDispatch();
  const { navigate } = useNav();

  const handleBackButtonPress = (): void => {
    navigate(Routes.Home);
  };

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_VIEW_COMICS_SHOP));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Screen
        withHeader={true}
        gradient="comicShop"
        backgroundImage={comicShop}
        rightBalance
        onBackButtonPress={handleBackButtonPress}
        qaID="COMIC_SHOP_HOME">
        <AvatarWrapper>
          <GenericAvatar />
        </AvatarWrapper>

        <ComicShopContainer />
      </Screen>

      <ComicShopFirstVisitModal />
      <ComicShopJustOpenedComicsModal />
    </>
  );
};

export default ComicShop;
