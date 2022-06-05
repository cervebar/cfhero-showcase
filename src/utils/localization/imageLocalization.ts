import { ImageRequireSource } from 'react-native';

import { LocalizedImage } from '../../types/comicShop';
import i18n from '../i18n';

/**
 * localized images are identified by localizedImage values in comicShopLib.ts
 * @param image image with localization options
 * @return best fitting localized image or default
 */
export const localizeImage = (image: LocalizedImage): ImageRequireSource => {
  const locale = i18n.language;
  if (locale === 'sk' && image.sk) return image.sk;
  if (locale === 'pl' && image.pl) return image.pl;
  if (locale === 'uk' && image.uk) return image.uk;
  return image.default;
};
