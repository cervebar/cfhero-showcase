import { ImageRequireSource } from 'react-native';

import getStringEnums from '../utils/getStringEnums';
import { StoreItemPriceT } from './store';

const ComicIdsList = getStringEnums([
  'c1',
  'c2',
  'c3',
  'c4',
  'c5',
  'c6',
  'c7',
  'c8',
  'c9',
  'c10',
  'c11',
  'c12',
  'c14',
  'c15',
  'c16',
  'c17',
]);
export type ComicIdsT = keyof typeof ComicIdsList;

export type ComicsPurchasedT = ComicIdsT[];

export type ComicActionItemT = {
  id: ComicIdsT;
  price: StoreItemPriceT;
  category: string;
};

export type ComicPageT = {
  image: LocalizedImage;
  hasGenderSpecificText?: boolean;
};

export type LocalizedImage = {
  default: ImageRequireSource;
  sk?: ImageRequireSource;
  pl?: ImageRequireSource;
  uk?: ImageRequireSource;
};

export type ComicEndItemT = {
  positive: boolean;
};

export type ComicItemT = {
  id: ComicIdsT;
  analyticsId: string;
  icon: ImageRequireSource;
  price: number;
  pages: ComicPageT[];
  thumbs: ComicEndItemT[];
};

export type ComicShopGroupT = {
  id: string;
  analyticsId: string;
  items: ComicItemT[];
  icon: ImageRequireSource;
  requiredLevel: number;
};

export type ComicShopLibT = ComicShopGroupT[];

export type ComicShopStateT = {
  comicShopPurchased: ComicsPurchasedT;
  counterComicBought: number;
  showFirstVisitModal: boolean;
  justOpenedBoxId: string | null;
};

export type ComicAndGroupT = {
  comic: ComicItemT;
  comicGroup: ComicShopGroupT;
};

export type ComicPageWithEndPage = ComicPageT;
