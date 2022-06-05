import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import '@react-native-firebase/analytics';
import '@react-native-firebase/firestore';
import '@react-native-firebase/crashlytics';

import firebase from '@react-native-firebase/app';
import React, { FC } from 'react';
import { Platform, UIManager } from 'react-native';
import { NavigationAction, NavigationRoute, NavigationState } from 'react-navigation';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { trackUserPath } from './src/actions/tracking';
import AppContainer from './src/AppContainer';
import { Routes } from './src/Routes';
import store, { persistor } from './src/store';
import { ANALYTICS_VIEW_HOME_SCREEN } from './src/utils/googleEvents';
import { ThemeProvider } from './src/utils/theme/styledComponents';
import { theme } from './src/utils/theme/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AppContainerWrapper: FC = () => {
  const dispatch = useDispatch();

  const getActiveRouteName = (state: NavigationState): NavigationRoute => {
    const route = state.routes[state.index];
    if (route.routes) {
      // Dive into nested navigators
      return getActiveRouteName(state.routes[state.index]);
    }

    return route;
  };

  const onNavigationStateChange = (
    _prevNavigationState: NavigationState,
    nextNavigationState: NavigationState,
    action: NavigationAction,
  ): void => {
    const nextRoute = getActiveRouteName(nextNavigationState);

    // Use action.type === 'Navigation/COMPLETE_TRANSITION' instead of just matching route name
    // to avoid event duplicities - navigation action & transition complete, this approach also
    // covers back navigation action

    if (nextRoute && nextRoute.routeName && action.type === 'Navigation/COMPLETE_TRANSITION') {
      firebase
        .analytics()
        .logScreenView({ screen_name: nextRoute.routeName, screen_class: nextRoute.routeName });
    }

    if (
      nextRoute &&
      nextRoute.routeName === Routes.Home &&
      action.type === 'Navigation/COMPLETE_TRANSITION'
    ) {
      dispatch(trackUserPath(ANALYTICS_VIEW_HOME_SCREEN));
    }
  };

  return <AppContainer onNavigationStateChange={onNavigationStateChange} uriPrefix="cfhero2://" />;
};

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainerWrapper />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
