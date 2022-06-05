import { useGender } from './useGender';

export function useIsBoy(): boolean {
  const gender = useGender();
  return gender === 'male';
}
