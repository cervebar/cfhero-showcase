import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { importAndroidUserData } from '../actions/application';
import { addNewFlutter, removeFlutter, setActiveFlutterId } from '../actions/flutter';
import { RootActions } from '../actions/rootActions';
import { FluttersStateT } from '../types/devices';

const initialState: FluttersStateT = {
  devices: [],
  activeId: '',
};

const flutterReducer: Reducer<FluttersStateT, RootActions> = (state = initialState, action) => {
  switch (action.type) {
    case getType(addNewFlutter):
      return { ...state, devices: [...state.devices, action.payload] };
    case getType(removeFlutter):
      return {
        ...state,
        devices: [...state.devices.filter(device => device.id !== action.payload)],
      };
    case getType(setActiveFlutterId):
      return { ...state, activeId: action.payload };
    case getType(importAndroidUserData):
      const {
        payload: { flutter },
      } = action;
      const devices = flutter.devices.map((device: any) => ({
        ...device,
        kind: device?.analyticsId,
      }));
      return {
        ...flutter,
        devices,
      };
    default:
      return state;
  }
};

export default flutterReducer;
