import { useCallback, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { setSeasonalThemeId } from '../actions/application';
import { setBackground } from '../actions/store';
import { backgrounds } from '../data/backgroundData';
import { RootStateType } from '../reducers/rootReducers';
import { ApplicationSeasonalThemeT } from '../types/application';
import { NO_SEASON, getSeasonalThemeMatchId } from '../utils/seasonalThemes/seasonalThemeUtils';

export const useSeasonalThemeChecker = (): void => {
  const dispatch = useDispatch();
  const seasonalTheme = useSelector<RootStateType, ApplicationSeasonalThemeT>(
    state => state.application.seasonalTheme,
  );
  const lastNonSeasonalBackgroundId = useSelector<RootStateType, String>(
    state => state.store.lastNonSeasonalBackgroundId,
  );

  const checkSeasonalTheme = useCallback(() => {
    if (!seasonalTheme.seasonalThemeEnabled) {
      return; // no season check
    }
    let seasonalThemeMatch = getSeasonalThemeMatchId();
    if (seasonalThemeMatch !== seasonalTheme.seasonalThemeId) {
      // season changed, starts or ends
      dispatch(setSeasonalThemeId(seasonalThemeMatch));
      if (seasonalThemeMatch === NO_SEASON) {
        // season ends: unset season to last bought background (or default as initial state)
        const background = backgrounds.find(b => b.id === lastNonSeasonalBackgroundId)!!;
        dispatch(setBackground(background));
      } else {
        // season starts:
        const background = backgrounds.find(b => b.id === seasonalThemeMatch)!!;
        dispatch(setBackground(background));
      }
    }
  }, [
    dispatch,
    lastNonSeasonalBackgroundId,
    seasonalTheme.seasonalThemeEnabled,
    seasonalTheme.seasonalThemeId,
  ]);

  const handleSeasonChanged = useCallback(
    (nextAppState: AppStateStatus): void => {
      if (nextAppState === 'active') {
        checkSeasonalTheme();
      }
    },
    [checkSeasonalTheme],
  );

  useEffect(() => {
    checkSeasonalTheme();
  }, [checkSeasonalTheme]);

  useEffect(() => {
    AppState.addEventListener('change', handleSeasonChanged);

    return () => {
      AppState.removeEventListener('change', handleSeasonChanged);
    };
  }, [handleSeasonChanged]);
};
