import { badgeInitialState } from '../badges/badge';

const hasDuplicates = <T>(array: T[]): boolean => new Set(array).size !== array.length;

describe('Badge initial state', () => {
  it('should not contain duplicates', () => {
    const { available } = badgeInitialState;

    expect(hasDuplicates(available)).toBe(false);
  });
});
