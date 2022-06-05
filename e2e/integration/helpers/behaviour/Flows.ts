import {
  DailyInhalationAbsolvedScreen,
  DailyInhalationScreen,
  FirstInhalationHowToScreen,
  FirstInhalationPrepareInhalatorScreen,
  HomeScreen,
  InhalationScreen,
  ScreenHeader,
  WizardAgeScreen,
  WizardAvatarScreen,
  WizardBirthDateScreen,
  WizardDataCollectionScreen,
  WizardGiftScreen,
  WizardNameScreen,
  WizardNotificationsPermissionsScreen,
} from '..';

interface FlowsResult {
  goToHomeScreen: () => Promise<void>;
  goToDailyInhalationScreen: () => Promise<void>;
  goToComicShopHomeScreen: () => Promise<void>;
  goToDiaryScreen: () => Promise<void>;
}

interface FlowsProps {}

type FlowsF = (props?: FlowsProps) => FlowsResult;

const Flows: FlowsF = () => {
  const goToHomeScreen = async () => {
    await WizardAvatarScreen().openWizardNameScreen();
    await WizardNameScreen().openWizardBirthDateScreen();
    await WizardBirthDateScreen().openWizardAgeScreen();
    await WizardAgeScreen().openWizardGiftScreen();
    await WizardGiftScreen().checkOxygenGiftAmount();
    await WizardGiftScreen().openWizardDataCollectionScreen();
    await WizardDataCollectionScreen().openWizardNotificationsPermissionsScreen();
    await WizardNotificationsPermissionsScreen().openHomeScreen();
  };

  const goToDailyInhalationScreen = async () => {
    await goToHomeScreen();
    await HomeScreen().closeModal();
    await HomeScreen().openDailyInhalationScreen();
  };

  const goToComicShopHomeScreen = async () => {
    await goToHomeScreen();
    await HomeScreen().closeModal();
    await HomeScreen().openDailyInhalationScreen();
    await DailyInhalationScreen().openAbsolvedInhalationScreen();
    await DailyInhalationAbsolvedScreen().openFirstInhalationPrepareInhalatorScreen();
    await FirstInhalationPrepareInhalatorScreen().openFirstInhalationHowToScreen();
    await FirstInhalationHowToScreen().openInhalationScreen();
    await InhalationScreen().passPreparationCoundown();
    await InhalationScreen().prematurelyFinishInhalation();
    await HomeScreen().openComicShopHomeScreen();
  };

  const goToDiaryScreen = async () => {
    await WizardAvatarScreen().openWizardNameScreen();
    await WizardNameScreen().openWizardBirthDateScreen();
    await WizardBirthDateScreen().setBirthDate();
    await WizardBirthDateScreen().openWizardAgeScreen();
    await WizardAgeScreen().setAge();
    await WizardAgeScreen().openWizardGiftScreen();
    await WizardGiftScreen().openWizardDataCollectionScreen();
    await WizardDataCollectionScreen().openWizardNotificationsPermissionsScreen();
    await WizardNotificationsPermissionsScreen().openHomeScreen();
    await ScreenHeader().openDiaryScreen();
  };

  return {
    goToHomeScreen,
    goToDailyInhalationScreen,
    goToComicShopHomeScreen,
    goToDiaryScreen,
  };
};

export { Flows };
