import { fluttersImages } from '../../assets/images/ImagesDevices';
import { DeviceDataT } from '../types/devices';
import { Localizations } from '../utils/localization/constants';
import { getSupportedLocale } from '../utils/localization/getSupportedLocale';

const flutters: DeviceDataT[] = [
  {
    kind: 'flutter_aerobika_o_pep',
    title: 'Aerobika (O-PEP)',
    image: fluttersImages.flutter_aerobika_o_pep,
    analyticsId: 'flutter_aerobika_o_pep',
    localization: [Localizations.PL],
  },
  {
    kind: 'flutter_acapella',
    title: 'Acapella',
    image: fluttersImages.flutter_acapella,
    analyticsId: 'flutter_acapella',
    localization: [
      Localizations.CS,
      Localizations.SK,
      Localizations.PL,
      Localizations.UK,
      Localizations.DEFAULT,
    ],
  },
  {
    kind: 'flutter_coach2_2500',
    title: 'Coach 2 (2500)',
    image: fluttersImages.flutter_coach2_2500,
    analyticsId: 'flutter_coach2_2500',
    localization: [Localizations.CS, Localizations.SK, Localizations.UK, Localizations.DEFAULT],
  },
  {
    kind: 'flutter_coach2_4000',
    title: 'Coach 2 (4000)',
    image: fluttersImages.flutter_coach2_4000,
    analyticsId: 'flutter_coach2_4000',
    localization: [Localizations.CS, Localizations.SK, Localizations.UK, Localizations.DEFAULT],
  },
  //  ...
];

export const getLocalizedFlutters = (): DeviceDataT[] => {
  const locale = getSupportedLocale();
  const localizedFlutter: DeviceDataT[] = [];
  for (const flutter of flutters) {
    if (flutter.localization.some((l: string) => l === locale)) {
      localizedFlutter.push(flutter);
    }
  }
  return localizedFlutter;
};
