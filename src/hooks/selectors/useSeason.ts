import useMyState from '../useMyState';

export function useSeason() {
  return useMyState(state => state.application.seasonalTheme);
}
