import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';

type UseSubscriptionOnAppStateChangeT = (customCallback?: () => void) => void;

const useSubscriptionOnAppStateChange: UseSubscriptionOnAppStateChangeT = customCallback => {
  const [, setDummyState] = useState(false);

  const toggleDummyState = useCallback((): void => {
    setDummyState(prevState => !prevState);
  }, []);

  const callback = useMemo(
    () => customCallback || toggleDummyState,
    [customCallback, toggleDummyState],
  );

  useEffect(() => {
    if (callback) {
      AppState.addEventListener('change', callback);

      return () => {
        AppState.removeEventListener('change', callback);
      };
    }
    return () => {};
  }, [callback]);
};

export default useSubscriptionOnAppStateChange;
