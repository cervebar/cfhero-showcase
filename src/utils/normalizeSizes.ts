import memoizeOne from 'memoize-one';
import { Dimensions, PixelRatio, Platform } from 'react-native';

/**
 * @deprecated We want to use px instead, since we are optimizing the UI for both iOS and Android
 */
export const normalize = memoizeOne((size: number) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  // based on iphone 7's scale (screen width in designs)
  const scale = SCREEN_WIDTH / 375;

  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
});
