export const DARK_BLUE_COLOR = 'darkBlue';
export const DARK_BLUE_LIGHTER_COLOR = 'darkBlueLighter';
export const DARK_RED_COLOR = 'darkRed';
export const WHITE_COLOR = 'white';

export const colors: Colors = {
  // Naming convention → https://material.io/tools/color/
  white: '#ffffff',
  black: '#000',
  gray: 'rgba(22, 19, 56, 0.5)',
  shapeGray: '#e0e0e0',
  shapeDarkGray: '#404040',
  darkBlue: '#161338',
  lightBlue: '#0077ed',
  success: '#35BB69',
  yellow: '#F1D346',
  error: '#c71a2f',
  darkBlueLighter: '#9492B0',
  lightGrey: '#E5E5E5',
  darkRed: '#B21700',
};

const gradientColors: GradientColors = {
  dashboard_1: '#fcfe7e',
  dashboard_2: '#98c584',
  shop_1: '#bcfefe',
  shop_2: '#97b5b2',
  inhalation_1: '#b0e6ff',
  inhalation_2: '#4087ff',
  fluttering_1: '#5facc6',
  fluttering_2: '#ebc7a4',
  calendar_1: '#dbff5f',
  calendar_2: '#ffb4b5',
  comic_shop_1: '#00dfa5',
  comic_shop_2: '#8b23fe',
  comic_reader_1: '#fff',
  comic_reader_2: '#fff',
};

const font: Font = {
  family: {
    regular: 'AmaticSC-Regular',
    bold: 'AmaticSC-Bold',
    myriad: 'MyriadPro-Regular',
    myriadBold: 'MyriadPro-Bold',
  },
  size: {
    pico: 12,
    nano: 15,
    micro: 18,
    small: 21,
    default: 24,
    h4: 26,
    h3: 28,
    h2: 34,
    h1: 40,
    big: 50,
    xxl: 70,
  },
  color: {
    default: colors.black,
    light: colors.white,
    gray: colors.gray,
    red: colors.error,
    darkBlue: colors.darkBlue,
    white: colors.white,
    darkBlueLighter: colors.darkBlueLighter,
    lightGrey: colors.lightGrey,
    darkRed: colors.darkRed,
  },
};

const borderRadius: BorderRadius = {
  default: 15,
  button: 20,
  buttonNarrow: 10,
};

const avatar: AvatarT = {
  preview: {
    width: 180,
  },
};

type Colors = {
  white: string;
  black: string;
  gray: string;
  shapeGray: string;
  shapeDarkGray: string;
  darkBlue: string;
  lightBlue: string;
  success: string;
  yellow: string;
  error: string;
  darkBlueLighter: string;
  lightGrey: string;
  darkRed: string;
};

type GradientColors = {
  dashboard_1: string;
  dashboard_2: string;
  shop_1: string;
  shop_2: string;
  inhalation_1: string;
  inhalation_2: string;
  fluttering_1: string;
  fluttering_2: string;
  calendar_1: string;
  calendar_2: string;
  comic_shop_1: string;
  comic_shop_2: string;
  comic_reader_1: string;
  comic_reader_2: string;
};

type Size = {
  pico: number;
  nano: number;
  micro: number;
  small: number;
  default: number;
  h4: number;
  h3: number;
  h2: number;
  h1: number;
  big: number;
  xxl: number;
};

type FontColor = {
  default: string;
  light: string;
  gray: string;
  red: string;
  darkBlue: string;
  white: string;
  darkBlueLighter: string;
  lightGrey: string;
  darkRed: string;
};

type Family = {
  regular: string;
  bold: string;
  myriad: string;
  myriadBold: string;
};

type Font = {
  size: Size;
  color: FontColor;
  family: Family;
};

type AvatarT = {
  preview: {
    width: number;
  };
};

type BorderRadius = {
  default: number;
  button: number;
  buttonNarrow: number;
};

export type ThemeT = {
  avatar: AvatarT;
  colors: Colors;
  font: Font;
  gradientColors: GradientColors;
  borderRadius: BorderRadius;
};

export const theme: ThemeT = {
  avatar,
  colors,
  font,
  gradientColors,
  borderRadius,
};

export type FontSizesVariants = keyof Size;
export type FontColorVariants = keyof FontColor;
export type FontFamilyVariants = keyof Family;
export type ColorsVariants = keyof Colors;
