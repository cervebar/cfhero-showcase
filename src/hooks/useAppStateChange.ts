import { useCallback, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export type AppStateChangeHook = (status?: AppStateStatus) => void;

export type AppSateChangeHooks = {
  [index in AppStateStatus]?: AppStateChangeHook;
} & {
  onUnmount?: () => void;
  disabled?: boolean;
};

const execState = (
  template: AppStateStatus,
  hook: AppStateChangeHook | undefined,
  current: AppStateStatus,
) => template === current && hook?.(template);

export default function useAppStateChange(hooks: AppSateChangeHooks) {
  const { onUnmount, active, background, inactive, unknown, extension, disabled } = hooks;
  const listener = useCallback(
    (current: AppStateStatus) => {
      execState('active', active, current);
      execState('background', background, current);
      execState('inactive', inactive, current);
      execState('unknown', unknown, current);
      execState('extension', extension, current);
    },
    [active, background, inactive, unknown, extension],
  );

  useEffect(() => {
    if (!disabled) AppState.addEventListener('change', listener);

    return () => {
      onUnmount?.();
      AppState.removeEventListener('change', listener);
    };
  }, [onUnmount, listener, disabled]);
}
