import React from 'react';

import { INHALATION_MAX_COUNT } from '../containers/inhalation/constants';
import { SessionType } from '../types/session';
import styled from '../utils/theme/styledComponents';
import { SausagePartBase, SausageSection, getSausageSection } from './SausagePartBase';

const INHALATION_SAUSAGE_HEIGHT = 12;
const FLUTTERING_SAUSAGE_HEIGHT = 6;
const FULL_SAUSAGE_WIDTH = 148;

interface InhalationsSausagePartProps {
  inhalationsCount: number;
  fulfilled: boolean;
  section: SausageSection;
}

const InhalationSausagePart = ({
  inhalationsCount,
  fulfilled,
  section,
}: InhalationsSausagePartProps) => (
  <SausagePartBase
    height={INHALATION_SAUSAGE_HEIGHT}
    partsCount={inhalationsCount}
    backgroundColor={fulfilled ? '#2A276F' : '#E8E8E8'}
    section={section}
    fullWidth={FULL_SAUSAGE_WIDTH}
  />
);

type InhalationSausageFulfilmentProps = {
  inhalationsCount: number;
  doneCount: number;
};

const InhalationSausageFulfilment = ({
  inhalationsCount,
  doneCount,
}: InhalationSausageFulfilmentProps) => {
  const inhalationsCountCapped =
    inhalationsCount > INHALATION_MAX_COUNT ? INHALATION_MAX_COUNT : inhalationsCount;
  return (
    <>
      {[...new Array(inhalationsCountCapped)].map((_, index) => (
        <InhalationSausagePart
          inhalationsCount={inhalationsCountCapped}
          section={getSausageSection(index, inhalationsCountCapped)}
          fulfilled={doneCount > index}
          key={index}
        />
      ))}
    </>
  );
};

type FlutteringSausagePartProps = {
  flutteringsCount: number;
  section: SausageSection;
};

const FlutteringSausagePart = ({ flutteringsCount, section }: FlutteringSausagePartProps) => (
  <SausagePartBase
    height={FLUTTERING_SAUSAGE_HEIGHT}
    partsCount={flutteringsCount}
    section={section}
    fullWidth={FULL_SAUSAGE_WIDTH}
    backgroundColor={'#54A6DB'}
  />
);

type FlutteringSausageFulfillmentProps = {
  flutteringsCount: number;
  doneCount: number;
};

const FlutteringSausageFulfillment = ({
  flutteringsCount,
  doneCount,
}: FlutteringSausageFulfillmentProps) => {
  const doneCountCapped = Math.min(
    // The following covers the case where the user has done more flutterings than the current length of plan
    Math.min(flutteringsCount, doneCount),
    INHALATION_MAX_COUNT,
  );
  return (
    <>
      {[...new Array(doneCountCapped)].map((_, index) => (
        <FlutteringSausagePart
          flutteringsCount={doneCountCapped}
          section={getSausageSection(index, doneCountCapped)}
          key={index}
        />
      ))}
    </>
  );
};

const DiarySausagesWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type DiarySausagesIndicatorProps = {
  inhalationsCount: number;
  doneCount: number;
  inhalationKind?: SessionType;
};

export const DiarySausagesIndicator = ({
  inhalationsCount,
  doneCount,
  inhalationKind,
}: DiarySausagesIndicatorProps) => {
  const isFluttering = inhalationKind === SessionType.fluttering;
  return (
    <DiarySausagesWrapper>
      {isFluttering ? (
        <FlutteringSausageFulfillment flutteringsCount={inhalationsCount} doneCount={doneCount} />
      ) : (
        <InhalationSausageFulfilment inhalationsCount={inhalationsCount} doneCount={doneCount} />
      )}
    </DiarySausagesWrapper>
  );
};
