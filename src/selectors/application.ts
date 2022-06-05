import { RootStateType } from '../reducers/rootReducers';

export const isDoNotDisturbModeEnabled = (state: RootStateType): boolean => {
  return state.application.doNotDisturb.length > 0;
};

export const isContactAgreementEnabled = (state: RootStateType): boolean => {
  return state.user.contactAgreementEnabled;
};

export const isOnboardingCompleted = (state: RootStateType): boolean => {
  return state.inhalation.totalSuccessfulInhalations > 1;
};
