import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsFocused } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';

import { setVersionUpdateSeen } from '../actions/application';
import { trackUserPath } from '../actions/tracking';
import { DevHomeButtons } from '../containers/cheatsdev/DevButtons';
import GenericAvatar from '../containers/genericAvatar/GenericAvatar';
import HomeScreenContent from '../containers/home/HomeScreenContent';
import { RemainingInhalation } from '../containers/RemainingInhalation';
import { CFH2UpgradeModal } from '../containers/wizardImport/CFH2UpgradeModal';
import { useSeason } from '../hooks/selectors/useSeason';
import useGoToInhalation from '../hooks/useGoToInhalation';
import useMyState from '../hooks/useMyState';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { InhalationTourStep } from '../types/application';
import { SeasonalThemeKeys } from '../types/seasonalThemes';
import { ChangeStreakStrategyModal } from '../ui/changeStreakStrategy/ChangeStreakStrategyModal';
import { ReceivedMessageModal } from '../ui/modalMessages/ReceivedMessageModal';
import Screen from '../ui/Screen';
import Spacer from '../ui/Spacer';
import {
  VersionUpdateModal,
  VersionUpdateModalValuesT,
} from '../ui/versionUpdate/VersionUpdateModal';
import { ANALYTICS_VIEW_HOME_SCREEN } from '../utils/googleEvents';
import { getSeasonalEntity } from '../utils/seasonalThemes/seasonalTheme';
import styled from '../utils/theme/styledComponents';

const AvatarWrapper = styled.View`
  align-items: center;
`;

export const SHOW_CFH2_UPGRADE_MODAL_PARAMETER = 'showCFH2UpgradeModal';

const HomeScreen = () => {
  const { getParam, navigate } = useNav();
  const navigateToInhalation = useGoToInhalation();
  const dispatch = useDispatch();

  const versionUpdatesInLocalStore = useMyState(state => state.application.versionUpdates);

  const firstTime = getParam<boolean | undefined>('firstTime');
  const showCFH2UpgradeModal = getParam<boolean | undefined>(SHOW_CFH2_UPGRADE_MODAL_PARAMETER);
  const [modalOpened, setModalOpened] = useState<boolean>(!!firstTime);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(trackUserPath(ANALYTICS_VIEW_HOME_SCREEN));
  }, [dispatch]);

  const versionUpdateModalsVisibilityMap = useMemo(() => {
    const tempModalVisibilityMap = new Map();
    if (versionUpdatesInLocalStore?.length) {
      for (let i = 0; i < versionUpdatesInLocalStore.length; i++) {
        const versionUpdate = versionUpdatesInLocalStore[i];
        const { seen, version, translationKey } = versionUpdate;
        if (!seen) {
          tempModalVisibilityMap.set(version, {
            visible: true,
            version,
            translationKey,
            titleKey: versionUpdate.titleKey,
          });
        }
      }
    }
    return tempModalVisibilityMap;
  }, [versionUpdatesInLocalStore]);

  const firstInhalationStep = useMyState(state => state.application.inhalationTourStep);
  const theme = useSeason();

  const handleOnHeaderPress = useCallback(() => {
    setModalOpened(false);
    if (firstInhalationStep === InhalationTourStep.inhalationsCount) {
      navigateToInhalation();
    } else {
      navigate(Routes.Diary);
    }
  }, [setModalOpened, firstInhalationStep, navigateToInhalation, navigate]);

  const handleOnVersionUpdateRead = useCallback(
    (version: string) => {
      dispatch(setVersionUpdateSeen(version));
    },
    [dispatch],
  );

  const getVersionUpdateModals = (modalsVisibilityMap: Map<string, VersionUpdateModalValuesT>) => {
    const modals = [];
    for (const [version, modalValues] of modalsVisibilityMap.entries()) {
      modals.push(
        <VersionUpdateModal
          key={`update-modal-${version}`}
          version={version}
          modalValues={modalValues}
          onConfirmPress={handleOnVersionUpdateRead}
        />,
      );
    }
    return modals;
  };

  return (
    <>
      {isFocused && <ReceivedMessageModal />}
      {showCFH2UpgradeModal ? <CFH2UpgradeModal /> : null}
      <Screen
        dashboard
        onHeaderPress={handleOnHeaderPress}
        rightBalance
        verticalSpacing
        backgroundImage={getSeasonalEntity(theme, SeasonalThemeKeys.HOME_SCREEN_BG_IMAGE)}
        titleComponent={<RemainingInhalation />}
        qaID="HOME">
        <Spacer padding={1} />
        <AvatarWrapper>
          <GenericAvatar />
        </AvatarWrapper>
        <HomeScreenContent onSetFirstTimeModalOpened={setModalOpened} modalOpened={modalOpened} />
        {!firstTime &&
          versionUpdateModalsVisibilityMap &&
          getVersionUpdateModals(versionUpdateModalsVisibilityMap)}
        <ChangeStreakStrategyModal />
        <DevHomeButtons />
      </Screen>
    </>
  );
};

export default HomeScreen;
