import firebase from '@react-native-firebase/app';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { useDispatch, useSelector } from 'react-redux';

import { applicationLaunched, resetActiveModalID, resetDoNotDisturb } from '../actions/application';
import { setUserId } from '../actions/user';
import useAppUsageBadge from '../hooks/useAppUsageBadge';
import useNav from '../hooks/useNav';
import { RootStateType } from '../reducers/rootReducers';
import { Routes } from '../Routes';
import { generateUserId } from '../utils/userId';

const InitialScreen = () => {
  const dispatch = useDispatch();
  const { navigate } = useNav();
  const firsTimeUsage = useSelector<RootStateType, boolean>(state => state.user.firstTimeUsage);
  const userId = useSelector<RootStateType, string | undefined>(state => state.user.id);
  useAppUsageBadge();

  RNBootSplash.hide({ fade: true });

  useEffect(() => {
    if (!userId) {
      const generatedUserId = generateUserId();
      dispatch(setUserId(generatedUserId));
      firebase.crashlytics().setUserId(generatedUserId);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // update application launched counter
    dispatch(applicationLaunched());
    // reset Do not disturb state
    dispatch(resetDoNotDisturb());
    // reset active modal
    dispatch(resetActiveModalID());
  }, [dispatch]);

  useEffect(() => {
    if (firsTimeUsage) {
      navigate(Routes.Wizard);
    } else {
      navigate(Routes.App);
    }
  }, [firsTimeUsage, navigate]);

  return <View />;
};

export default InitialScreen;
