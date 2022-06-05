import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BadgeInfoT } from '../../types/badge';
import BadgeDetailsModal from '../../ui/badges/BadgeDetailsModal';
import BadgesList from '../../ui/profile/BadgesList';
import ProfileSection from '../../ui/profile/ProfileSection';

export const ProfileSectionBadges = () => {
  const { t } = useTranslation('profile');
  const [selectedBadgeInfo, setSelectedBadgeInfo] = useState<BadgeInfoT | null>(null);

  const hideModal = (): void => setSelectedBadgeInfo(null);
  const showModal = (badgeInfo: BadgeInfoT): void => setSelectedBadgeInfo(badgeInfo);

  return (
    <>
      <ProfileSection title={t('badgesSectionTitle')}>
        <BadgesList onIconClick={showModal} />
      </ProfileSection>

      {selectedBadgeInfo && (
        <BadgeDetailsModal badgeInfo={selectedBadgeInfo} onConfirmPress={hideModal} />
      )}
    </>
  );
};
