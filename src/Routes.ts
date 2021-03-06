import getStringEnums from './utils/getStringEnums';

export const Routes = getStringEnums([
  'App',
  'About',
  'Badges',
  'BreathPattern',
  'ComicShop',
  'ComicEnd',
  'ComicReader',
  'DailyInhalation',
  'DailyInhalationAbsolved',
  'Devices',
  'Diary',
  'ExerciseSettings',
  'FirstInhalation',
  'FirstInhalationPrepareInhalator',
  'FirstInhalationHowTo',
  'Fluttering',
  'FlutteringSuccess',
  'FlutteringSetup',
  'Fluttering',
  'Home',
  'Inhalation',
  'InhalationSetup',
  'WheelOfFortune',
  'InhalationStreakIncreased',
  'InhalationSuccess',
  'Initial',
  'NewInhalator',
  'NewFlutter',
  'NewMedicine',
  'MedicineAmount',
  'PersonalProfile',
  'SeasonalChange',
  'Store',
  'StoreCategory',
  'StoreCategoryBackground',
  'SettingsMenu',
  'BrokenStreak',
  'Wizard',
  'WizardAge',
  'WizardConditions',
  'WizardUnderAgeAgreement',
  'WizardUnderAgeParentEmail',
  'WizardAdultAgreement',
  'WizardNew',
  'WizardAvatar',
  'WizardImport',
  'WizardImportSummary',
  'WizardImportUninstallCFH1',
  'WizardBirthdate',
  'WizardDataCollection',
  'WizardGift',
  'WizardName',
  'Notification',
]);

export type RoutesT = keyof typeof Routes;
