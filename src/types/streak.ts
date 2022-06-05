export type BrokenStreakT = {
  date: number;
  fixed: boolean;
  visited?: boolean;
  status?: BrokenStreakStatus;
};

export type StreakStateT = {
  brokenStreaks: BrokenStreakT[];
};

export enum BrokenStreakStatus {
  None,
  Fixed,
  Fixable,
  Permanent,
}
