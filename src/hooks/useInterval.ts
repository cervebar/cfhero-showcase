import { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

function useInterval(
  onTick: (stop?: () => void) => void,
  startOnAppStateActive = false,
  intervalMs = 1000,
): [() => void, () => void, boolean] {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const handler = useRef(onTick);

  handler.current = onTick;

  const stop = useCallback(() => {
    if (!interval.current) return;
    clearInterval(interval.current);
    interval.current = null;
  }, [interval]);

  const start = useCallback(() => {
    if (interval.current) return;
    interval.current = setInterval(() => handler.current(stop), intervalMs);
  }, [intervalMs, stop]);

  const onAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        if (startOnAppStateActive) {
          start();
        }
      } else {
        stop();
      }
    },
    [start, stop, startOnAppStateActive],
  );

  useEffect(() => {
    AppState.addEventListener('change', onAppStateChange);
    return () => {
      AppState.removeEventListener('change', onAppStateChange);
      stop();
    };
  }, [onAppStateChange, stop]);

  return [start, stop, !!interval.current];
}

export default useInterval;
