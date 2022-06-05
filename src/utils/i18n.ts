import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';
import { findBestAvailableLanguage } from 'react-native-localize';

import cs from '../translations/cs.json';
import pl from '../translations/pl.json';
import sk from '../translations/sk.json';
import uk from '../translations/uk.json';

const translations = { cs, sk, pl, uk };

type detectCbT = (cb: (arg: string) => void) => void;
const detectT: detectCbT = cb => {
  const { languageTag } = findBestAvailableLanguage(Object.keys(translations)) || {
    languageTag: 'cs',
  };
  cb(languageTag);
};
type languageDetectorT = {
  type: 'languageDetector';
  async?: boolean;
  detect: detectCbT;
  init: () => void;
  cacheUserLanguage: () => void;
};
const languageDetector: languageDetectorT = {
  type: 'languageDetector',
  async: true,
  detect: detectT,
  init: () => {
    return;
  },
  cacheUserLanguage: () => {
    return;
  },
};

i18next
  .use(intervalPlural)
  .use(languageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      cs,
      sk,
      pl,
      uk,
    },
    fallbackLng: 'cs',
    debug: false, // set to true to activate console debugging
    // lng: 'sk', // language to use (overrides language detection)
    load: 'languageOnly',
  });

export default i18next;
