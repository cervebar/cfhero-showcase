import { Timestamp } from './time';

export enum SessionResolutionState {
  ok = 'ok',
  expired = 'expired',
  interrupted = 'interrupted',
}

export type SessionT = {
  created: Timestamp;
  oxygens: number;
  duration: number;
  resolutionState: SessionResolutionState;
};

export type CompletedSessionT = SessionT & {
  startLevel: number;
  startStreak: number;
};

export function isSuccessful(session: SessionT | undefined) {
  return session?.resolutionState === SessionResolutionState.ok;
}

export enum SessionType {
  inhalation,
  fluttering,
}
