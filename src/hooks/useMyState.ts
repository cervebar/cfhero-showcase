import { useSelector } from 'react-redux';

import { RootStateType } from '../reducers/rootReducers';

export default function useMyState<T>(selector: (state: RootStateType) => T) {
  return useSelector(selector);
}
