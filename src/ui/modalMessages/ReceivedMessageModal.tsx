import React, { FC } from 'react';
import { Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import { hideModalMessageModal } from '../../actions/modalMessage';
import useNav from '../../hooks/useNav';
import { RootStateType } from '../../reducers/rootReducers';
import { Routes } from '../../Routes';
import { ModalMessageDataT } from '../../types/modalMessage';
import { MessageDetailsModal } from './MessageDetailsModal';

export const ReceivedMessageModal = () => {
  const dispatch = useDispatch();
  const { navigate } = useNav();

  const toDisplayQueue = useSelector<RootStateType, ModalMessageDataT[]>(
    state => state.modalMessage.toDisplayQueue,
  );

  const data = toDisplayQueue[0];
  if (!data) {
    // empty queue - no modal message to display
    return null;
  }
  const handleClose = (): void => {
    dispatch(hideModalMessageModal({ id: data.id, action: 'close' }));
  };

  const handleAction = (): void => {
    dispatch(hideModalMessageModal({ id: data.id, action: data.action })); //always hide modal
    switch (data.action) {
      case 'shop':
        navigate(Routes.Store);
        break;
      case 'comics':
        navigate(Routes.ComicShop);
        break;
      case 'settings':
        navigate(
          Routes.SettingsMenu,
          {},
          NavigationActions.navigate({
            routeName: Routes.SettingsMenu,
          }),
        );
        break;
      case 'link':
        if (data.link != null) {
          Linking.openURL(data.link).catch(err => console.error("Couldn't load page", err));
        }
        break;
      default:
      //do nothing just hide modal
    }
  };

  return (
    <MessageDetailsModal modalMessageData={data} onClose={handleClose} onAction={handleAction} />
  );
};
