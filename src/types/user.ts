export enum GenderT {
  MALE = 'male',
  FEMALE = 'female',
}

export type BirthdateT = {
  day?: number;
  month?: number;
  year?: number;
};

export type BirthdateDayT = {
  day: number;
  month: number;
};

export type ContactT = {
  email?: string;
  termsSent?: boolean;
};

export type UserT = {
  id?: string;
  name?: string;
  gender?: GenderT;
  birthdate?: BirthdateT;
  contact?: ContactT;
  clinicalTrialId?: string;
};

export type DataCollectionT = {
  dataCollectionEnabled: boolean;
};

export type ContactAgreementT = {
  contactAgreementEnabled: boolean;
};

export type FirstTimeUsageT = {
  firstTimeUsage: boolean;
};

export type UserStateT = UserT & DataCollectionT & ContactAgreementT & FirstTimeUsageT;
