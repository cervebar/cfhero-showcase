import React from 'react';

import { INHALATION_MAX_COUNT } from '../containers/inhalation/constants';
import { normalize } from '../utils/normalizeSizes';
import styled from '../utils/theme/styledComponents';
import { SausagePartBase, SausageSection, getSausageSection } from './SausagePartBase';

const SAUSAGE_HEIGHT = 12;
const FULL_SAUSAGE_WIDTH = 104;
const SAUSAGE_BORDERED_HEIGHT = 18;
const FULL_SAUSAGE_BORDERED_WIDTH = 168;

interface SausagePartProps {
  inhalationsCount: number;
  fulfilled: boolean;
  section: SausageSection;
  border?: boolean;
}

const SausagePart = ({ inhalationsCount, fulfilled, section, border }: SausagePartProps) => (
  <SausagePartBase
    style={border ? { borderWidth: 1, borderColor: '#838178' } : undefined}
    partsCount={inhalationsCount}
    section={section}
    backgroundColor={fulfilled ? '#2A276F' : '#ECECEC'}
    fullWidth={border ? FULL_SAUSAGE_BORDERED_WIDTH : FULL_SAUSAGE_WIDTH}
    height={border ? SAUSAGE_BORDERED_HEIGHT : SAUSAGE_HEIGHT}
  />
);

type SausageFulfillmentProps = {
  inhalationsCount: number;
  doneCount: number;
  border: boolean;
};
const SausageFulfillment = ({ inhalationsCount, doneCount, border }: SausageFulfillmentProps) => {
  const inhalationsCapped =
    inhalationsCount > INHALATION_MAX_COUNT ? INHALATION_MAX_COUNT : inhalationsCount;
  return (
    <>
      {[...new Array(inhalationsCapped)].map((_, index) => (
        <SausagePart
          inhalationsCount={inhalationsCapped}
          fulfilled={doneCount > index}
          section={getSausageSection(index, inhalationsCapped)}
          border={border}
          key={index}
        />
      ))}
    </>
  );
};

const SausagesWrapper = styled.View`
  width: ${normalize(120)};
  flex-direction: row;
  align-items: center;
`;

type SausagesIndicatorProps = {
  inhalations: number;
  done: number;
  isResultScreen?: boolean;
  border?: boolean;
};

export const SausagesIndicator = ({
  inhalations,
  done,
  isResultScreen = false,
  border = false,
}: SausagesIndicatorProps) => {
  const justifyContent = isResultScreen ? 'flex-end' : 'center';
  return (
    <SausagesWrapper style={{ justifyContent: justifyContent }}>
      <SausageFulfillment inhalationsCount={inhalations} doneCount={done} border={border} />
    </SausagesWrapper>
  );
};
