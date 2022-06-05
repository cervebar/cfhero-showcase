import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { copyStateFromFirebase } from '../../actions/application';
import { DevButton } from './DevButton';

export const DevCopyStateFromFirebaseButton = () => {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const perform = (id: string | undefined, merge: boolean) => {
      if (!id) return;
      dispatch(copyStateFromFirebase({ id, merge }));
    };
    Alert.prompt('Enter user ID', 'Find desired user ID in firebase.', [
      { text: 'Merge', onPress: id => perform(id, true) },
      { text: 'Replace', onPress: id => perform(id, false) },
      { text: 'Cancel', onPress: () => {} },
    ]);
  }, [dispatch]);

  return <DevButton onClick={handleClick} label="Copy State From" />;
};
