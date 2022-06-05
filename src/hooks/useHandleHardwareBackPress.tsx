import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from 'react-navigation-hooks';

export function usePreventHardwareBackPressNavigationPop() {
  useHandleHardwareBackPress(() => true);
}

/**
 *
 * @param backPressHandler Return true, when navigation pop should be prevented
 */
export function useHandleHardwareBackPress(backPressHandler: () => boolean) {
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backPressHandler);
      return () => BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
    }, [backPressHandler]),
  );
}
