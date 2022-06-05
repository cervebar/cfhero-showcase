import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { AboutScreen } from './containers/settings/AboutScreen';
import { Routes } from './Routes';
import { BadgesScreen } from './screens/BadgesScreen';
import BreathPattern from './screens/BreathPattern';
import { BrokenStreakScreen } from './screens/BrokenStreakScreen';
import ComicEnd from './screens/ComicEnd';
import ComicReader from './screens/ComicReader';
import ComicShop from './screens/ComicShop';
import DailyInhalation from './screens/DailyInhalation';
import DailyInhalationAbsolved from './screens/DailyInhalationAbsolved';
import { DevicesScreen } from './screens/Devices';
import DiaryScreen from './screens/Diary';
import { ExerciseSettingsScreen } from './screens/ExerciseSettings';
import FirstInhalationHowTo from './screens/FirstInhalationHowTo';
import FirstInhalationPrepareInhalator from './screens/FirstInhalationPrepareInhalator';
import Fluttering from './screens/Fluttering';
import FlutteringSetup from './screens/FlutteringSetup';
import FlutteringSuccess from './screens/FlutteringSuccess';
import HomeScreen from './screens/Home';
import Inhalation from './screens/Inhalation';
import InhalationSetup from './screens/InhalationSetup';
import { InhalationStreakIncreased } from './screens/InhalationStreakIncreased';
import InhalationSuccess from './screens/InhalationSuccess';
import InitialScreen from './screens/Initial';
import MedicineAmount from './screens/MedicineAmount';
import NewFlutter from './screens/NewFlutter';
import NewInhalator from './screens/NewInhalator';
import NewMedicine from './screens/NewMedicine';
import { NotificationScreen } from './screens/NotificationScreen';
import { PersonalProfileScreen } from './screens/PersonalProfile';
import { SettingsMenuScreen } from './screens/SettingsMenu';
import { SettingsSeasonalChangeScreen } from './screens/SettingsSeasonaChangeScreen';
import { StoreCategoryBackgroundScreen } from './screens/StoreCategoryBackgroundScreen';
import { StoreCategoryScreen } from './screens/StoreCategoryScreen';
import { StoreScreen } from './screens/StoreScreen';
import { WheelOfFortune } from './screens/WheelOfFortune';
import WizardAdultAgreement from './screens/WizardAdultAgreement';
import WizardAge from './screens/WizardAge';
import WizardAvatar from './screens/WizardAvatar';
import WizardBirthdate from './screens/WizardBirthdate';
import WizardConditions from './screens/WizardConditions';
import WizardDataCollection from './screens/WizardDataCollection';
import WizardGift from './screens/WizardGift';
import { WizardImport } from './screens/WizardImport';
import { WizardImportSummary } from './screens/WizardImportSummary';
import { WizardImportUninstallCFH1 } from './screens/WizardImportUninstallCFH1';
import WizardName from './screens/WizardName';
import WizardNew from './screens/WizardNew';
import WizardUnderAgeAgreement from './screens/WizardUnderAgeAgreement';
import WizardUnderAgeParentEmail from './screens/WizardUnderAgeParentEmail';

const disableScreenGesture = {
  navigationOptions: {
    gestureEnabled: false,
  },
};
const disableStackGesture = {
  ...disableScreenGesture,
  defaultNavigationOptions: {
    animationEnabled: true,
    gestureEnabled: false,
  },
};

const SettingsNavigator = createStackNavigator(
  {
    [Routes.Diary]: DiaryScreen,
    [Routes.SettingsMenu]: SettingsMenuScreen,
    [Routes.Devices]: DevicesScreen,
    [Routes.PersonalProfile]: PersonalProfileScreen,
    [Routes.ExerciseSettings]: ExerciseSettingsScreen,
    [Routes.WizardConditions]: WizardConditions,
    [Routes.Notification]: NotificationScreen,
    [Routes.SeasonalChange]: SettingsSeasonalChangeScreen,
  },
  { headerMode: 'none' },
);

const StoreNavigator = createStackNavigator(
  {
    [Routes.Store]: StoreScreen,
    [Routes.StoreCategory]: StoreCategoryScreen,
    [Routes.StoreCategoryBackground]: StoreCategoryBackgroundScreen,
  },
  { headerMode: 'none' },
);

const InhalationNavigator = createStackNavigator(
  {
    [Routes.Inhalation]: Inhalation,
    [Routes.InhalationStreakIncreased]: InhalationStreakIncreased,
    [Routes.InhalationSuccess]: InhalationSuccess,
    [Routes.WheelOfFortune]: WheelOfFortune,
  },
  {
    headerMode: 'none',
    ...disableStackGesture,
  },
);

const FlutteringNavigator = createStackNavigator(
  {
    [Routes.Fluttering]: Fluttering,
    [Routes.FlutteringSuccess]: FlutteringSuccess,
  },
  {
    headerMode: 'none',
    ...disableStackGesture,
  },
);

const AppNavigator = createStackNavigator(
  {
    [Routes.Home]: HomeScreen,
    [Routes.DailyInhalation]: DailyInhalation,
    [Routes.DailyInhalationAbsolved]: DailyInhalationAbsolved,
    [Routes.BreathPattern]: BreathPattern,
    [Routes.FirstInhalationPrepareInhalator]: FirstInhalationPrepareInhalator,
    [Routes.FirstInhalationHowTo]: FirstInhalationHowTo,
    [Routes.Badges]: BadgesScreen,
    [Routes.Store]: StoreNavigator,
    [Routes.Inhalation]: InhalationNavigator,
    [Routes.ComicEnd]: ComicEnd,
    [Routes.ComicShop]: ComicShop,
    [Routes.SettingsMenu]: SettingsNavigator,
    [Routes.ComicReader]: {
      screen: ComicReader,
      ...disableScreenGesture,
    },
    [Routes.NewInhalator]: NewInhalator,
    [Routes.NewFlutter]: NewFlutter,
    [Routes.InhalationSetup]: InhalationSetup,
    [Routes.NewMedicine]: NewMedicine,
    [Routes.MedicineAmount]: MedicineAmount,
    [Routes.FlutteringSetup]: {
      screen: FlutteringSetup,
      ...disableScreenGesture,
    },
    [Routes.Fluttering]: FlutteringNavigator,
    [Routes.BrokenStreak]: {
      screen: BrokenStreakScreen,
      ...disableScreenGesture,
    },
    [Routes.About]: AboutScreen,
  },
  { headerMode: 'none' },
);

const WizardNavigator = createStackNavigator(
  {
    [Routes.WizardNew]: WizardNew,
    [Routes.WizardAvatar]: WizardAvatar,
    [Routes.WizardImport]: {
      screen: WizardImport,
      path: WizardImport.path,
    },
    [Routes.WizardImportSummary]: WizardImportSummary,
    [Routes.WizardImportUninstallCFH1]: WizardImportUninstallCFH1,
    [Routes.WizardName]: WizardName,
    [Routes.WizardBirthdate]: WizardBirthdate,
    [Routes.WizardAge]: WizardAge,
    [Routes.WizardGift]: WizardGift,
    [Routes.WizardDataCollection]: WizardDataCollection,
    [Routes.WizardUnderAgeAgreement]: WizardUnderAgeAgreement,
    [Routes.WizardAdultAgreement]: WizardAdultAgreement,
    [Routes.WizardUnderAgeParentEmail]: WizardUnderAgeParentEmail,
    [Routes.WizardConditions]: WizardConditions,
  },
  { headerMode: 'none' },
);

export const MainNavigator = createSwitchNavigator(
  {
    [Routes.Initial]: InitialScreen,
    [Routes.App]: AppNavigator,
    [Routes.Wizard]: {
      screen: WizardNavigator,
      path: 'wizard',
    },
  },
  {
    initialRouteName: Routes.Initial,
  },
);
