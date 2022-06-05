import { ImageRequireSource } from 'react-native';

export const SeasonalThemeKeys = {
  ID: 'id',
  HOME_SCREEN_BG_IMAGE: 'homeScreenBackgroundImage',
  INHALATION_BG_IMAGE: 'inhalationBackgroundImage',
  FLUTTERING_BG_IMAGE: 'flutteringBackgroundImage',
  INHALATION_OXYGEN_IMAGE: 'inhalationOxygenImage',
  FLUTTERING_OXYGEN_IMAGE: 'flutteringOxygenImage',
  RESULT_SCREEN_ANIMATION: 'resultScreenAnimation',
  SMALL_FALLING_OXYGEN: 'smallFallingOxygen',
};

export type SeasonalThemeT = {
  id: string;
  homeScreenBackgroundImage?: ImageRequireSource;
  inhalationBackgroundImage: ImageRequireSource;
  flutteringBackgroundImage: ImageRequireSource;
  inhalationOxygenImage: ImageRequireSource;
  flutteringOxygenImage: ImageRequireSource;
  smallFallingOxygen: ImageRequireSource;
  resultScreenAnimation: {
    source: any;
    loop: boolean;
  };
  dateStartFormat?: string;
  dateEndFormat?: string;
  dateStart?: Date;
  dateEnd?: Date;
  default?: boolean;
};

export type SeasonalThemesLibT = SeasonalThemeT[];
