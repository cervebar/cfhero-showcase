import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useLocalizedInhalators } from '../../hooks/useLocalized';
import { RootStateType } from '../../reducers/rootReducers';
import { DeviceDataT, DeviceT } from '../../types/devices';
import { AddDeviceForm } from './AddDeviceForm';

interface NewInhalatorContentProps {
  onDevicePress: (activeItem: DeviceDataT) => void;
  activeDevice: DeviceDataT | undefined;
  customDeviceName: string;
  onSetCustomDeviceName: (v: string) => void;
}

export const NewInhalatorContent = ({
  onDevicePress,
  activeDevice,
  customDeviceName,
  onSetCustomDeviceName,
}: NewInhalatorContentProps) => {
  const { t } = useTranslation('newInhalator');
  const localizedInhalators = useLocalizedInhalators();
  const currentInhalators = useSelector<RootStateType, DeviceT[]>(state => state.inhalator.devices);

  const filteredInhalators = localizedInhalators.filter(
    inhalator => !currentInhalators.some(x => x.kind === inhalator.kind),
  );

  return (
    <AddDeviceForm
      t={t}
      devicesData={filteredInhalators}
      activeDevice={activeDevice}
      onDevicePress={onDevicePress}
      customDeviceName={customDeviceName}
      onSetCustomDeviceName={onSetCustomDeviceName}
    />
  );
};
