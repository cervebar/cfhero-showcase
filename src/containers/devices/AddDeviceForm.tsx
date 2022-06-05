import { TFunction } from 'i18next';
import React, { ReactElement } from 'react';

import { selector } from '../../packages/automationSelectors';
import { DeviceDataT, DevicesDataT } from '../../types/devices';
import Item from '../../ui/Item';
import Text from '../../ui/Text';
import TextInputWithoutFormik from '../../ui/TextInputWithoutFormik';
import { normalize } from '../../utils/normalizeSizes';
import styled from '../../utils/theme/styledComponents';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-top: ${normalize(-20)};
`;

const Devices = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ItemWrapper = styled.View`
  width: 25%;
`;

const Content = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-top: ${normalize(10)};
`;

const ContentWrapper = styled.View`
  justify-content: space-between;
`;

export type handleClickT<T> = (activeItem: T) => void;

type AddDeviceFormProps = {
  t: TFunction;
  devicesData: DevicesDataT;
  activeDevice?: DeviceDataT;
  onDevicePress: (activeItem: DeviceDataT) => void;
  customDeviceName: string;
  onSetCustomDeviceName: (v: string) => void;
};

export const AddDeviceForm = ({
  t,
  devicesData,
  onDevicePress,
  activeDevice,
  customDeviceName,
  onSetCustomDeviceName,
}: AddDeviceFormProps): ReactElement => {
  const handleChangeText = (text: string): void => {
    onSetCustomDeviceName(text);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Text align="left" size="h2">
          {t('type_device')}
        </Text>
        <Devices>
          {devicesData.map(item => (
            <ItemWrapper key={`${item.kind}`}>
              <Item
                icon={item.image}
                isActive={item === activeDevice}
                onPress={() => onDevicePress(item)}
                title={item.title}
              />
            </ItemWrapper>
          ))}
        </Devices>
        <Content>
          <Text size="h2">{t('what_name')}</Text>
          <TextInputWithoutFormik
            value={customDeviceName}
            onChangeText={handleChangeText}
            maxLength={20}
            qaID="DEVICE_NAME"
            style={{ width: '50%' }}
          />
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
};
