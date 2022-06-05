import { SessionT } from './session';

export type FlutteringT = SessionT & {
  flutterId: string;
};

export type DailyFlutteringsT = {
  flutterings: FlutteringT[];
  date: number;
};

export type FlutteringStateT = {
  dailyFlutterings: DailyFlutteringsT[];
  currentPatternIndex: number;
  temporaryPatternIndex: number;
  pdvVisited: boolean;
  totalSuccessfulFlutteringsCount: number;
};

export type FlutteringPatternT = {
  inhale: number;
  dehale: number;
  pause: number;
};

export type FlutteringPatternsLibT = FlutteringPatternT[];
