import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { getBackFromShopCategory } from '../actions/badgeChecks';
import StoreCategory from '../containers/store/StoreCategory';
import { useAvatar } from '../hooks/selectors/useAvater';
import useNav from '../hooks/useNav';
import { StoreItemsCategoryNameT } from '../types/store';
import Screen from '../ui/Screen';

export const StoreCategoryScreen: FC = () => {
  const { t } = useTranslation('store');
  const { getParam, goBack } = useNav();
  const dispatch = useDispatch();
  const currentCategory = getParam<StoreItemsCategoryNameT>('category');
  const avatar = useAvatar();

  const backToStore = () => {
    // for badge chameleon to compare difference if anything has changed
    dispatch(getBackFromShopCategory(avatar));
    goBack();
  };

  return (
    <Screen
      gradient="shop"
      headerTitle={t(`categories.titles.${currentCategory}`)}
      qaID={`STORE_${currentCategory.toLocaleUpperCase()}`}
      onBackButtonPress={() => backToStore()}
      rightBalance>
      <StoreCategory currentCategory={currentCategory} />
    </Screen>
  );
};
