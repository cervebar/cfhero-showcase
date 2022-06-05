import Config from 'react-native-config';

import { RootStateType } from '../reducers/rootReducers';
import useMyState from './useMyState';

export default function useShowCheats() {
  const cheatsOn = useMyState<boolean>((state: RootStateType) => state.application.cheatsOn);
  return Config.IS_DEVELOP === 'true' && cheatsOn === true;
}
