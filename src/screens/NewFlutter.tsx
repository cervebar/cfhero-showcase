import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';

import { addNewFlutter, setActiveFlutterId } from '../actions/flutter';
import NewFlutterContent from '../containers/devices/NewFlutterContent';
import useNav from '../hooks/useNav';
import { Routes, RoutesT } from '../Routes';
import { DeviceDataT, FlutterDeviceT } from '../types/devices';
import { ButtonWrapper } from '../ui/BasicLayoutComponents';
import Button from '../ui/Button';
import Screen from '../ui/Screen';

const NewFlutter: FC = () => {
  const { t } = useTranslation('newFlutter');
  const { navigate, getParam } = useNav();
  const dispatch = useDispatch();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const returnRoute: RoutesT = getParam<RoutesT>('returnRoute') || Routes.Devices;

  const [activeDevice, setActiveDevice] = useState<DeviceDataT | undefined>(undefined);
  const [customDeviceName, setCustomDeviceName] = useState('');

  const handleDevicePress = (activeItem: DeviceDataT): void => {
    setActiveDevice(activeItem);
  };

  const handleSubmitPress = (): void => {
    setSubmitDisabled(true);
    const id = uuidv1();
    if (!submitDisabled && activeDevice) {
      const deviceName = customDeviceName !== '' ? customDeviceName : activeDevice.title;

      const newDevice: FlutterDeviceT = {
        kind: activeDevice.kind,
        id: id,
        name: deviceName,
        analyticsId: activeDevice.analyticsId,
      };
      dispatch(addNewFlutter(newDevice));
      dispatch(setActiveFlutterId(id));
    }
    navigate(returnRoute);
  };

  const bottomRightOverlayContent = (
    <ButtonWrapper>
      <Button
        dark
        onPress={handleSubmitPress}
        disabled={submitDisabled}
        qaID="ADD_DEVICE_FORM_SUBMIT">
        {t('shared:buttons.done')}
      </Button>
    </ButtonWrapper>
  );

  return (
    <Screen
      withScrollView={true}
      headerTitle={t('title')}
      onBackButtonPress={() => navigate(returnRoute)}
      bottomRightOverlayContent={bottomRightOverlayContent}>
      <NewFlutterContent
        onDevicePress={handleDevicePress}
        activeDevice={activeDevice}
        customDeviceName={customDeviceName}
        onSetCustomDeviceName={setCustomDeviceName}
      />
    </Screen>
  );
};

export default NewFlutter;
