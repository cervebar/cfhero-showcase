import { ActionType } from 'typesafe-actions';

import { Avatar } from '../types/avatar';
import { HabitMasterT } from '../types/badgesChecks';
import { createSyncedAction } from '../utils/createSyncedAction';

export const habitMasterCounterChange = createSyncedAction(
  '@badges_checks/HABIT_MASTER_COUNTER_CAHNGE',
)<HabitMasterT>();
export const addMorningLarkCount = createSyncedAction(
  '@badges_checks/ADD_MORNING_LARK_COUNT',
)<void>();
export const addNightOwlCount = createSyncedAction('@badges_checks/ADD_NIGHT_OWL_COUNT')<void>();

export const getBackFromShopCategory = createSyncedAction(
  '@badges_checks/GET_BACK_FROM_SHOP_CATEGORY',
)<Avatar>();

export type BadgesChecksActions = ActionType<
  | typeof habitMasterCounterChange
  | typeof addMorningLarkCount
  | typeof addNightOwlCount
  | typeof getBackFromShopCategory
>;
