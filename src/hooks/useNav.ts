import { useNavigation } from 'react-navigation-hooks';

import { RoutesT } from '../Routes';

/* usage of getParamTyped as follows:
const { getParam } = useNav()
const x = getParam<string>("ff")
*/
export const useNav = () => {
  const { navigate, getParam, dispatch, state, goBack } = useNavigation<RoutesT>();
  function gT<T>(a: string, fb: string = '') {
    return getParam(a, fb) as T;
  }

  return {
    navigate,
    dispatch,
    getParam: gT,
    state,
    goBack,
  };
};
