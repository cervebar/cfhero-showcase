import useMyState from '../../hooks/useMyState';

export function useGender(): string {
  const gender = useMyState(state => state.user.gender);
  return gender !== undefined ? gender : 'male';
}
