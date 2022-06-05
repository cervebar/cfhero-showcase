import flutteringPatternsLib from '../../constants/flutteringPatternsLib';
import { RootStateType } from '../../reducers/rootReducers';
import { FlutteringT } from '../../types/fluttering';
import { SessionResolutionState } from '../../types/session';
import { StartInhalationEventT } from '../../types/tracking';
import {
  ANALYTICS_FLUTTERING_EXPIRED,
  ANALYTICS_FLUTTERING_INTERRUPTED,
  ANALYTICS_FLUTTERING_REPORT_FINISHED,
  ANALYTICS_FLUTTERING_START,
  ANALYTICS_UP_FLUTTERING_EXPIRED,
  ANALYTICS_UP_FLUTTERING_FINISHED,
  ANALYTICS_UP_FLUTTERING_INTERRUPTED,
  ANALYTICS_UP_START_FLUTTERING,
} from '../../utils/googleEvents';
import { getMillisecondsFromSeconds } from '../../utils/time';
import { logAnalyticsData, logUserPath } from './logEvents';

export const logStartFluttering = (data: StartInhalationEventT, state: RootStateType): void => {
  const { timestampCreated, deviceId } = data;
  const flutteringPattern = flutteringPatternsLib[state.fluttering.currentPatternIndex];
  let deviceAnalyticsId = 'onboarding';
  let deviceName = 'onboarding';
  const deviceFound = state.flutter.devices.find(device => device.id === deviceId);
  if (deviceFound) {
    deviceAnalyticsId = deviceFound.analyticsId;
    deviceName = deviceFound.name;
  }
  logUserPath(ANALYTICS_UP_START_FLUTTERING);
  const params = {
    dvc_id: deviceAnalyticsId,
    dvc: deviceName,
    start: timestampCreated,
    f_dur_down: getMillisecondsFromSeconds(flutteringPattern.dehale),
    f_dur_up: getMillisecondsFromSeconds(flutteringPattern.inhale),
  };
  logAnalyticsData(ANALYTICS_FLUTTERING_START, params);
};

export const logFlutteringFinished = (payload: FlutteringT, state: RootStateType): void => {
  logUserPath(ANALYTICS_UP_FLUTTERING_FINISHED);
  const { created, duration, flutterId, oxygens } = payload;
  let deviceAnalyticsId = 'onboarding';
  let deviceName = 'onboarding';
  const deviceFound = state.flutter.devices.find(device => device.id === flutterId);
  if (deviceFound) {
    deviceAnalyticsId = deviceFound.analyticsId;
    deviceName = deviceFound.name;
  }
  const flutteringPattern = flutteringPatternsLib[state.fluttering.currentPatternIndex];
  const params = {
    start: created,
    i_plan: state.inhalation.dailyPlannedInhalations,
    stop: created + duration,
    dvc: deviceName,
    dvc_id: deviceAnalyticsId,
    ox_er: oxygens,
    dur_down: getMillisecondsFromSeconds(flutteringPattern.dehale),
    dur_up: getMillisecondsFromSeconds(flutteringPattern.inhale),
  };
  logAnalyticsData(ANALYTICS_FLUTTERING_REPORT_FINISHED, params);
};

export const logFlutteringFailed = (data: FlutteringT) => {
  const params = {
    start: data.created,
  };
  switch (data.resolutionState) {
    case SessionResolutionState.expired:
      logUserPath(ANALYTICS_UP_FLUTTERING_EXPIRED);
      logAnalyticsData(ANALYTICS_FLUTTERING_EXPIRED, params);
      break;
    case SessionResolutionState.interrupted:
      logUserPath(ANALYTICS_UP_FLUTTERING_INTERRUPTED);
      logAnalyticsData(ANALYTICS_FLUTTERING_INTERRUPTED, params);
      break;
  }
};
