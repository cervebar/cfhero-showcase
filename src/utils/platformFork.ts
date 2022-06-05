import { Platform } from 'react-native';

export function platformFork<T>(androidValue: T, iosValue: T): T {
  if (Platform.OS === 'android') {
    return androidValue;
  } else if (Platform.OS === 'ios') {
    return iosValue;
  } else {
    throw new Error(`Unsupported platform ${Platform.OS}`);
  }
}
