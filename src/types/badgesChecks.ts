import { Avatar } from './avatar';

export type HabitMasterT = {
  lastDay: number;
  counter: number;
};

/** vytrvalec
 * checking after each inhalation
 */
export type StayerT = {
  lastDayChecked: number; // last day checked: this day have at least one inhalation
  counter: number; // how much days with at least inhalation already done
};

export type BadgesChecksT = {
  habitMaster: HabitMasterT;
  stayer: StayerT;
  morningLark: {
    counter: number;
  };
  nightOwl: {
    counter: number;
  };
  buyToutCount: {
    counter: number;
  };
  pedant: {
    counter: number;
  };
  chameleon: {
    counter: number;
    lastAvatarItemsState: Avatar;
  };
};
