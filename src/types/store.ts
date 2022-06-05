import { ImageRequireSource, ImageSourcePropType } from 'react-native';

import { GenderT } from './user';

export enum StoreItemsCategoryNameT {
  HEAD = 'head',
  LEGS = 'legs',
  UPPERBODY = 'upperbody',
  HAT = 'hat',
  BACKGROUND = 'background',
}

export type StoreItemsCategoryT = {
  name: StoreItemsCategoryNameT;
  thumb: ImageSourcePropType;
  openLevel: number;
};

export type StoreCategoriesT = StoreItemsCategoryT[];

export type StoreItemIdT = string;

export type StoreItemPriceT = number;

export type StoreItemsPurchasedT = StoreItemIdT[];

export type StoreRawItemT = {
  id: StoreItemIdT;
  analyticsId: string;
  image?: ImageSourcePropType;
  preview: ImageSourcePropType;
  price?: StoreItemPriceT;
  unlockLevel?: number;
};
export type StoreItemT = StoreRawItemT & StoreItemInformationT;

export type StoreItemInformationT = {
  category:
    | StoreItemsCategoryNameT.HAT
    | StoreItemsCategoryNameT.HEAD
    | StoreItemsCategoryNameT.LEGS
    | StoreItemsCategoryNameT.UPPERBODY;
  gender: GenderT;
};

export type StoreItemsT = StoreItemT[];

export type StoreStateT = {
  storePurchased: StoreItemsPurchasedT;
  backgroundItemsPurchased: string[];
  counterUpperOrLowerItems: number;
  showFirstVisitModal: boolean;
  backgroundsId: string;
  lastNonSeasonalBackgroundId: string;
};

export type StoreItemBackgroundT = {
  id: string;
  analyticsId: string;
  price: number;
  inhalationHand: ImageRequireSource;
  flutteringHand: ImageRequireSource;
  icon: ImageRequireSource;
  isSeasonal: boolean;
  inhalationBackgroundImage: ImageRequireSource;
  flutteringBackgroundImage: ImageRequireSource;
};
