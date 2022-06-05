import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';

import { addNewInhalator, setActiveInhalatorId } from '../actions/inhalator';
import NewInhalatorContent from '../containers/devices/NewInhalatorContent';
import useNav from '../hooks/useNav';
import { Routes, RoutesT } from '../Routes';
import { DeviceDataT, InhalatorDeviceT } from '../types/devices';
import { ButtonWrapper } from '../ui/BasicLayoutComponents';
import Button from '../ui/Button';
import Screen from '../ui/Screen';

const NewInhalator: FC = () => {
  const { t } = useTranslation('newInhalator');
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

      const newDevice: InhalatorDeviceT = {
        kind: activeDevice.kind,
        id: id,
        name: deviceName,
        analyticsId: activeDevice.analyticsId,
      };
      dispatch(addNewInhalator(newDevice));
      dispatch(setActiveInhalatorId(id));
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
      <NewInhalatorContent
        onDevicePress={handleDevicePress}
        activeDevice={activeDevice}
        customDeviceName={customDeviceName}
        onSetCustomDeviceName={setCustomDeviceName}
      />
    </Screen>
  );
};

export default NewInhalator;
