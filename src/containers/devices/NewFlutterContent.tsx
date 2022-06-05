import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useLocalizedFlutters } from '../../hooks/useLocalized';
import { RootStateType } from '../../reducers/rootReducers';
import { DeviceDataT, DeviceT } from '../../types/devices';
import { AddDeviceForm } from './AddDeviceForm';

interface NewFlutterContentProps {
  onDevicePress: (activeItem: DeviceDataT) => void;
  activeDevice: DeviceDataT | undefined;
  customDeviceName: string;
  onSetCustomDeviceName: (v: string) => void;
}

export const NewFlutterContent = ({
  onDevicePress,
  activeDevice,
  customDeviceName,
  onSetCustomDeviceName,
}: NewFlutterContentProps) => {
  const { t } = useTranslation('newFlutter');
  const flutters = useLocalizedFlutters();
  const currentFlutters = useSelector<RootStateType, DeviceT[]>(state => state.flutter.devices);

  const filteredFlutters = flutters.filter(
    flutter => !currentFlutters.some(x => x.kind === flutter.kind),
  );

  return (
    <AddDeviceForm
      t={t}
      devicesData={filteredFlutters}
      activeDevice={activeDevice}
      onDevicePress={onDevicePress}
      customDeviceName={customDeviceName}
      onSetCustomDeviceName={onSetCustomDeviceName}
    />
  );
};
