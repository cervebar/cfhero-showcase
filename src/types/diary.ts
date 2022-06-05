import { DailyFlutteringsT } from './fluttering';
import { DailyInhalationsT } from './inhalation';

export type DiaryRecordT = [DailyInhalationsT, DailyFlutteringsT | undefined];

export type WeeklyInhalationOverviewT = {
  totalCompleted: number;
  totalCompletedInPlan: number;
  totalPlanned: number;
};
