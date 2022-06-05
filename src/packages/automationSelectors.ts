import { qaID } from 'automation-selectors';
import { Platform } from 'react-native';

export type WithQaID = { qaID?: string };

type selectorT = (selectorValue?: string) => {};
export const selector: selectorT = selectorValue => {
  if (process.env.NODE_ENV !== 'production') {
    const uppered = (selectorValue || '').toUpperCase();
    return qaID(uppered, Platform.OS);
  }
  return {};
};
