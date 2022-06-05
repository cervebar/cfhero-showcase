import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { removeFlutter } from '../../actions/flutter';
import { useLocalizedFlutters } from '../../hooks/useLocalized';
import useNav from '../../hooks/useNav';
import { RootStateType } from '../../reducers/rootReducers';
import { Routes } from '../../Routes';
import { DeviceT } from '../../types/devices';
import DevicesList from '../../ui/profile/DevicesList';
import ProfileSection from '../../ui/profile/ProfileSection';

export const ProfileSectionInhalators = () => {
  const { navigate } = useNav();
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const flutters = useLocalizedFlutters();

  const ownedDevicesOriginalOrder = useSelector<RootStateType, DeviceT[]>(
    state => state.flutter.devices,
  );
  const activeFlutterId = useSelector<RootStateType, string>(state => state.flutter.activeId);

  const ownedDevices = useMemo(
    () => ownedDevicesOriginalOrder.reverse(),
    [ownedDevicesOriginalOrder],
  );
  const handleAddDevicePress = (): void => {
    navigate(Routes.NewFlutter);
  };

  return (
    <ProfileSection title={t('fluttersSectionTitle')}>
      <DevicesList
        ownedDevices={ownedDevices}
        handleAddDevicePress={handleAddDevicePress}
        deviceDataList={flutters}
        removeDevice={kind => dispatch(removeFlutter(kind))}
        activeDevice={activeFlutterId}
      />
    </ProfileSection>
  );
};
