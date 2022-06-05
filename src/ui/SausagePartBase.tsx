import styled from '../utils/theme/styledComponents';

export type SausageSection = 'left' | 'mid' | 'right' | 'single';
export const SausagePartBase = styled.View<{
  partsCount: number;
  section: SausageSection;
  backgroundColor: string;
  fullWidth: number;
  height: number;
}>`
  display: flex;
  width: ${({ partsCount, fullWidth }) => Math.round(fullWidth / partsCount)}px;
  height: ${({ height }) => height}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-top-left-radius: ${({ section, fullWidth }) =>
    isSection(section, 'left') ? fullWidth : 0}px;
  border-bottom-left-radius: ${({ section, fullWidth }) =>
    isSection(section, 'left') ? fullWidth : 0}px;
  border-top-right-radius: ${({ section, fullWidth }) =>
    isSection(section, 'right') ? fullWidth : 0}px;
  border-bottom-right-radius: ${({ section, fullWidth }) =>
    isSection(section, 'right') ? fullWidth : 0}px;
  margin: 0 1px;
`;

export function getSausageSection(index: number, partsCount: number): SausageSection {
  if (index === 0 && partsCount === 1) {
    // Only one part in the whole sausage
    return 'single';
  }
  if (index === 0) {
    // First part of the sausage
    return 'left';
  }
  if (index === partsCount - 1) {
    // Last part of the sausage
    return 'right';
  }
  // Any middle part of the sausage
  return 'mid';
}

function isSection(currentSection: SausageSection, desiredSection: SausageSection) {
  if (currentSection === 'single') {
    return true;
  }
  return currentSection === desiredSection;
}
