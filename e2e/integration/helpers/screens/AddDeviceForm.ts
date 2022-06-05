import { by, element, expect } from 'detox';
import { getText } from 'detox-getprops';

import { fillInput, tapElement, isVisible } from '../commands';
import { CUSTOM_DEVICE_NAME } from '../credentials';
import { ui as inhalationSetupScreenUI } from './InhalationSetupScreen';
import { ui as flutteringSetupScreenUI } from './FlutteringSetupScreen';

const ui = {
  screen: 'ADD_DEVICE_FORM',
  button: {
    submitDeviceForm: 'BUTTON_ADD_DEVICE_FORM_SUBMIT',
  },
  inputDeviceName: 'INPUT_DEVICE_NAME',
  device: {
    pariEflowRapid: 'DEVICE_INHALATOR_EFLOW_RAPID_NEBULISER_SYSTEM',
    littleDoctorLD: 'DEVICE_INHALATOR_NEBULIZER_LD_250U',
    pariBoyMobile: 'DEVICE_INHALATOR_PARI_BOY_MOBILE_S',
    flutterAcapella: 'DEVICE_FLUTTER_ACAPELLA',
  },
};

interface AddDeviceFormResult {
  selectDeviceWithOriginalName: () => Promise<void>;
  selectDeviceWithCustomlName: () => Promise<void>;
  selectFlutter: () => Promise<void>;
}

interface AddDeviceFormProps {}

type AddDeviceFormF = (props?: AddDeviceFormProps) => AddDeviceFormResult;

const AddDeviceForm: AddDeviceFormF = () => {
  const selectDeviceWithOriginalName = async () => {
    const availableDeviceName = await getText(element(by.id(ui.device.pariEflowRapid)));
    await tapElement(ui.device.pariEflowRapid);
    await tapElement(ui.button.submitDeviceForm);
    await isVisible(inhalationSetupScreenUI.screen);
    await expect(element(by.text(availableDeviceName))).toBeVisible();
  };

  const selectFlutter = async () => {
    const availableDeviceName = await getText(element(by.id(ui.device.flutterAcapella)));
    await tapElement(ui.device.flutterAcapella);
    await tapElement(ui.button.submitDeviceForm);
    await isVisible(flutteringSetupScreenUI.screen);
    await expect(element(by.text(availableDeviceName))).toBeVisible();
  };

  const selectDeviceWithCustomlName = async () => {
    await tapElement(ui.device.littleDoctorLD);
    await fillInput(ui.inputDeviceName, CUSTOM_DEVICE_NAME);
    await tapElement(ui.button.submitDeviceForm);
    await isVisible(inhalationSetupScreenUI.screen);
    await expect(element(by.text(CUSTOM_DEVICE_NAME))).toBeVisible();
  };

  return {
    selectDeviceWithOriginalName,
    selectDeviceWithCustomlName,
    selectFlutter,
  };
};

export { AddDeviceForm, ui };
