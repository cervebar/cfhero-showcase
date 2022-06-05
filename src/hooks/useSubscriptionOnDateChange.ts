import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, AppStateStatus, LogBox } from 'react-native';

type UseSubscriptionOnDateChangeT = (customCallback?: () => void) => void;

const useSubscriptionOnDateChange: UseSubscriptionOnDateChangeT = customCallback => {
  const [, setDummyState] = useState(false);
  const timerId = useRef<undefined | NodeJS.Timeout>(undefined);

  const toggleDummyState = useCallback((): void => {
    setDummyState(prevState => !prevState);
  }, []);

  const callback = useMemo(
    () => customCallback || toggleDummyState,
    [customCallback, toggleDummyState],
  );

  const resetTimer = useCallback(
    (nextAppState: AppStateStatus): void => {
      if (nextAppState === 'active') {
        if (timerId.current) {
          clearTimeout(timerId.current);
        }

        const now = new Date();
        let midnight = new Date();
        midnight.setDate(midnight.getDate() + 1);
        midnight.setHours(0, 0, 0, 5);

        const difference = midnight.getTime() - now.getTime();
        if (callback) {
          LogBox.ignoreLogs(['Setting a timer']);
          timerId.current = setTimeout(callback, difference);
        }
      }

      if (nextAppState === 'background') {
        if (timerId.current) {
          clearTimeout(timerId.current);
        }
      }
    },
    [callback],
  );

  useEffect(() => {
    resetTimer('active');
  }, [resetTimer]);

  useEffect(() => {
    AppState.addEventListener('change', resetTimer);

    return () => {
      AppState.removeEventListener('change', resetTimer);
    };
  }, [resetTimer]);
};

export default useSubscriptionOnDateChange;
