import React from 'react';

import { SectionInhalators } from '../settings/devices/SectionInhalators';
import ProfileSectionBadges from './ProfileSectionBadges';
import ProfileSectionFlutters from './ProfileSectionFlutters';

export const ProfileContainer = () => {
  return (
    <>
      <ProfileSectionBadges />
      <SectionInhalators />
      <ProfileSectionFlutters />
    </>
  );
};
