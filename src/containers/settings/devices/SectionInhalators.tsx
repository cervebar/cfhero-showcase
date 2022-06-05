import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { removeInhalator } from '../../../actions/inhalator';
import { useLocalizedInhalators } from '../../../hooks/useLocalized';
import useNav from '../../../hooks/useNav';
import { RootStateType } from '../../../reducers/rootReducers';
import { Routes } from '../../../Routes';
import { DeviceT } from '../../../types/devices';
import DevicesList from '../../../ui/profile/DevicesList';
import ProfileSection from '../../../ui/profile/ProfileSection';

export const SectionInhalators = () => {
  const { navigate } = useNav();
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const localizedInhalators = useLocalizedInhalators();

  const ownedDevicesOriginalOrder = useSelector<RootStateType, DeviceT[]>(
    state => state.inhalator.devices,
  );
  const activeInhalatorId = useSelector<RootStateType, string>(state => state.inhalator.activeId);

  const ownedDevices = useMemo(
    () => ownedDevicesOriginalOrder.reverse(),
    [ownedDevicesOriginalOrder],
  );
  const handleAddDevicePress = () => navigate(Routes.NewInhalator);

  return (
    <ProfileSection title={t('inhalatorsSectionTitle')}>
      <DevicesList
        ownedDevices={ownedDevices}
        handleAddDevicePress={handleAddDevicePress}
        deviceDataList={localizedInhalators}
        removeDevice={kind => dispatch(removeInhalator(kind))}
        activeDevice={activeInhalatorId}
      />
    </ProfileSection>
  );
};
