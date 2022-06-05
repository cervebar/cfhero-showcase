import { backgroundImages } from '../../assets/images/ImagesStore';
import { StoreItemBackgroundT } from '../types/store';

export const backgrounds: StoreItemBackgroundT[] = [
  {
    id: 'default',
    analyticsId: 'default',
    price: 0,
    isSeasonal: false,
    ...backgroundImages.default,
  },
  {
    id: 'abstract1',
    analyticsId: 'abstract1',
    price: 2500,
    isSeasonal: false,
    ...backgroundImages.abstract1,
  },
  {
    id: 'abstract2',
    analyticsId: 'abstract2',
    price: 2000,
    isSeasonal: false,
    ...backgroundImages.abstract2,
  },
  {
    id: 'sea',
    analyticsId: 'sea',
    price: 2500,
    isSeasonal: false,
    ...backgroundImages.sea,
  },
  {
    id: 'sport',
    analyticsId: 'sport',
    price: 1500,
    isSeasonal: false,
    ...backgroundImages.sport,
  },
  {
    id: 'christmas',
    analyticsId: 'christmas',
    price: 0,
    isSeasonal: true,
    ...backgroundImages.christmas,
  },
  {
    id: 'easter2021',
    analyticsId: 'easter2021',
    price: 0,
    isSeasonal: true,
    ...backgroundImages.easter,
  },
  {
    id: 'halloween',
    analyticsId: 'halloween',
    price: 0,
    isSeasonal: true,
    ...backgroundImages.halloween,
  },
];
