import React, { FC } from 'react';
import { useNavigationParam } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';

import { trackUserPath } from '../actions/tracking';
import ComicReaderContainer from '../containers/comicReader/ComicReaderContainer';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { ComicItemT } from '../types/comicShop';
import Screen from '../ui/Screen';
import { ANALYTICS_UP_COMICS_SCENARIO_INTERRUPT } from '../utils/googleEvents';

const ComicReader: FC = () => {
  const { navigate } = useNav();
  const comics: ComicItemT = useNavigationParam('comic');
  const dispatch = useDispatch();

  const handleBackBtnPress = (): void => {
    dispatch(trackUserPath(`${ANALYTICS_UP_COMICS_SCENARIO_INTERRUPT}_${comics.analyticsId}`));
    navigate(Routes.ComicShop);
  };

  return (
    <Screen
      gradient="comicReader"
      onBackButtonPress={handleBackBtnPress}
      withContainer={false}
      qaID="COMIC_READER">
      <ComicReaderContainer />
    </Screen>
  );
};

export default ComicReader;
