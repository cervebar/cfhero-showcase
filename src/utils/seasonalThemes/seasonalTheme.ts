import {
  DEFAULT_THEME,
  getOxygenImage,
  seasonalThemesLib,
} from '../../constants/seasonalThemesLib';
import { backgrounds } from '../../data/backgroundData';
import { ApplicationSeasonalThemeT } from '../../types/application';
import { SeasonalThemeT } from '../../types/seasonalThemes';

export const getSeasonalTheme = (seasonalThemeId: string): SeasonalThemeT => {
  const foundedSeasonalTheme = seasonalThemesLib.find(theme => theme.id === seasonalThemeId);
  if (foundedSeasonalTheme) {
    return foundedSeasonalTheme;
  }
  return DEFAULT_THEME;
};

/**
 * if seasonal theme is enabled and there is a season currently -> return that season
 * else return current background -> last bought or default
 * @param themeInfo
 * @param key  resource entity type (background, animation result screen, inahlation oxygen,...)
 * @param name for easter eggs
 */
export const getSeasonalEntity = (
  themeInfo: ApplicationSeasonalThemeT,
  key: string,
  name?: string,
): any => {
  let themeId;
  if (themeInfo.seasonalThemeEnabled) {
    themeId = getSeasonalTheme(themeInfo.seasonalThemeId);
  } else {
    themeId = getSeasonalTheme('default');
  }
  switch (key) {
    case 'id': {
      return themeId.id;
    }
    case 'homeScreenBackgroundImage': {
      return themeId.homeScreenBackgroundImage;
    }
    case 'inhalationBackgroundImage': {
      return themeId.inhalationBackgroundImage;
    }
    case 'flutteringBackgroundImage': {
      return themeId.flutteringBackgroundImage;
    }
    case 'inhalationOxygenImage': {
      return getOxygenImage(themeId.inhalationOxygenImage, name);
    }
    case 'flutteringOxygenImage': {
      return getOxygenImage(themeId.flutteringOxygenImage, name);
    }
    case 'resultScreenAnimation': {
      return themeId.resultScreenAnimation;
    }
    case 'smallFallingOxygen': {
      return themeId.smallFallingOxygen;
    }
    default:
      // TODO this should never happened, log to crashlytics
      return themeId.id;
  }
};

export const getInhalationBackground = (backgroundsId: string) => {
  return backgrounds.find(b => b.id === backgroundsId)!!.inhalationBackgroundImage;
};
export const getFlutteringBackground = (backgroundsId: string) => {
  return backgrounds.find(b => b.id === backgroundsId)!!.flutteringBackgroundImage;
};
