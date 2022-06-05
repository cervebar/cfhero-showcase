import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import {
  hideModalMessageModal,
  receiveModalMessage,
  removeModalMessage,
} from '../actions/modalMessage';
import { RootActions } from '../actions/rootActions';
import { ModalMessageDataT, ModalMessageStateT } from '../types/modalMessage';

const initialModalMessageState: ModalMessageStateT = {
  received: [],
  toDisplayQueue: [],
};

const handleRemoveModalMessage = (state: ModalMessageStateT, messageId: string) => {
  let nextReceived = state.received.filter(message => message !== messageId);
  return {
    ...state,
    received: nextReceived,
  };
};

const handleRecieveModalMessage = (
  state: ModalMessageStateT,
  messageReceived: ModalMessageDataT,
) => {
  let nextReceived = state.received;
  let nextToDisplayQueue = state.toDisplayQueue;

  const messageAlreadyReceived = state.received.some(message => message === messageReceived.id);
  if (!messageAlreadyReceived) {
    nextReceived = [...state.received, messageReceived.id];
    nextToDisplayQueue = [...state.toDisplayQueue, messageReceived];
  }
  return {
    received: nextReceived,
    toDisplayQueue: nextToDisplayQueue,
  };
};

export const modalMessageReducer: Reducer<ModalMessageStateT, RootActions> = (
  state = initialModalMessageState,
  action,
): ModalMessageStateT => {
  switch (action.type) {
    case getType(receiveModalMessage): {
      return handleRecieveModalMessage(state, action.payload);
    }
    case getType(removeModalMessage): {
      return handleRemoveModalMessage(state, action.payload);
    }
    case getType(hideModalMessageModal): {
      const [, ...receivedNext] = state.toDisplayQueue;
      return {
        ...state,
        toDisplayQueue: receivedNext,
      };
    }
    default:
      return state;
  }
};
