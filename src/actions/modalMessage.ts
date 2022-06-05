import { ActionType } from 'typesafe-actions';

import { ModalMessageAnalyticsT, ModalMessageDataT } from '../types/modalMessage';
import { createSyncedAction } from '../utils/createSyncedAction';

export const receiveModalMessage = createSyncedAction<'@modalMessage/RECEIVE', ModalMessageDataT>(
  '@modalMessage/RECEIVE',
)();

export const logReceiveModalMessage = createSyncedAction<
  '@modalMessage/RECEIVE_LOG',
  ModalMessageAnalyticsT
>('@modalMessage/RECEIVE_LOG')();

export const removeModalMessage = createSyncedAction<'@modalMessage/REMOVE', string>(
  '@modalMessage/REMOVE',
)();

export const hideModalMessageModal = createSyncedAction<
  '@modalMessage/HIDE_MODAL',
  ModalMessageAnalyticsT
>('@modalMessage/HIDE_MODAL')();

export type ModalMessageActions = ActionType<
  | typeof receiveModalMessage
  | typeof hideModalMessageModal
  | typeof removeModalMessage
  | typeof logReceiveModalMessage
>;
