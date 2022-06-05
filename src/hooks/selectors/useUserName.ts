import useMyState from '../useMyState';

export default function useUserName() {
  return useMyState(state => state.user.name) ?? '';
}
