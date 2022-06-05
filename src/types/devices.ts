import { ImageRequireSource } from 'react-native';

type DevicesStateT = {
  devices: DeviceT[];
  activeId: string;
};

export type DeviceT = {
  kind: string;
  name: string;
  id: string;
  analyticsId: string;
};

export type DevicesDataT = DeviceDataT[];

export type DeviceDataT = {
  kind: string;
  image: ImageRequireSource;
  title: string;
  analyticsId: string;
  localization: string[];
};

export type InhalatorsStateT = DevicesStateT;
export type InhalatorDeviceT = DeviceT;

export type FluttersStateT = DevicesStateT;
export type FlutterDeviceT = DeviceT;
