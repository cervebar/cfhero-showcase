import NetInfo from '@react-native-community/netinfo';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useFocusEffect, useNavigationParam } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';

import { importAndroidUserData } from '../actions/application';
import { trackUserPath } from '../actions/tracking';
import {
  WizardImportErrorModal,
  WizardImportErrorModalTypes,
} from '../containers/wizardImport/WizardImportErrorModal';
import { WizardImportStepOne } from '../containers/wizardImport/WizardImportStepOne';
import { WizardImportStepTwo } from '../containers/wizardImport/WizardImportStepTwo';
import {
  Buttons,
  Container,
  ImportIdInput,
  WhiteBox,
} from '../containers/wizardImport/WizardImportStyledElements';
import useNav from '../hooks/useNav';
import { logCFH1Import } from '../middleware/analytics/onboarding';
import { Routes } from '../Routes';
import Button from '../ui/Button';
import Screen from '../ui/Screen';
import Text from '../ui/Text';
import { ANALYTICS_VIEW_IMPORT_SCREEN } from '../utils/googleEvents';
import { makeRootStateFromImportData } from '../utils/makeRootStateFromAndroidImportData';

const IMPORT_ID_PARAMETER = 'importId';

WizardImport.path = `import/:${IMPORT_ID_PARAMETER}`;
export function WizardImport() {
  const { t } = useTranslation('wizardImport');
  const { navigate } = useNav();
  const dispatch = useDispatch();
  const importIdParam = useNavigationParam(IMPORT_ID_PARAMETER) as string;
  const [importId, setImportId] = useState(importIdParam || '');
  const [importData, importing] = useImportAndroidUserData();
  const [currentErrorType, setCurrentErrorType] = useState<WizardImportErrorModalTypes>(null);

  const startImport = useCallback(async () => {
    const netInfoResult = await NetInfo.refresh();
    if (!netInfoResult.isInternetReachable) {
      setCurrentErrorType('offline');
      return;
    }
    try {
      await importData(importId || importIdParam);
      logCFH1Import(true);
      navigate(Routes.WizardImportSummary);
    } catch (error) {
      logCFH1Import(false);
      console.error(error);
      await firebase.crashlytics().setAttribute('error-type', 'import-android-data');
      firebase.crashlytics().recordError(error);
      if (error.code === 'storage/object-not-found') {
        setCurrentErrorType('invalidImportId');
        return;
      }
      Toast.show({
        type: 'error',
        autoHide: false,
        text1: t('importFailure', { id: importId }),
      });
    }
  }, [importData, importId, importIdParam, navigate, t]);

  useFocusEffect(() => {
    dispatch(trackUserPath(ANALYTICS_VIEW_IMPORT_SCREEN));
    // Import ID has been initialized from route params
    if (importing || !importIdParam || !importIdParam.length) {
      return;
    }
    setImportId(importIdParam);
    startImport();
  });

  return (
    <Screen
      headerTitle={t('title')}
      withHeader={true}
      withBackButton={false}
      withContainer={false}
      withScrollView>
      <Container>
        <WhiteBox>
          <WizardImportStepOne />
          <WizardImportStepTwo />

          <View>
            <Text family="bold" style={{ paddingVertical: 5 }}>
              {t('importIdInputLabel')}
            </Text>
            <View style={{ alignItems: 'center' }}>
              <ImportIdInput
                maxLength={8}
                value={importId}
                onChangeText={setImportId}
                editable={true}
                placeholder={t('importIdInputPlaceholder')}
              />
            </View>
          </View>
        </WhiteBox>

        <Buttons>
          <Button borderless onPress={() => navigate(Routes.WizardNew)}>
            {t('shared:buttons.prev')}
          </Button>

          <Button dark onPress={startImport} disabled={!importId.length || importing}>
            {t('shared:buttons.upload')}
          </Button>
        </Buttons>
        <WizardImportErrorModal type={currentErrorType} onClose={() => setCurrentErrorType(null)} />
      </Container>
    </Screen>
  );
}

function useImportAndroidUserData(): [(importId: string) => Promise<void>, boolean] {
  const [importing, setImporting] = useState(false);

  const dispatch = useDispatch();

  const importData = useCallback(
    async (importId: string) => {
      try {
        setImporting(true);
        const url = await storage().ref(`android-exports/${importId}.json`).getDownloadURL();
        const result = await fetch(url);
        const androidUserData = await result.json();
        dispatch(importAndroidUserData(makeRootStateFromImportData(androidUserData)));
      } catch (error) {
        throw error;
      } finally {
        setImporting(false);
      }
    },
    [dispatch],
  );
  return [importData, importing];
}
