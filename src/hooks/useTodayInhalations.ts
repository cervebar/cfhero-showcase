import { getTodayInhalations } from '../utils/inhalation';
import useInhalations from './useInhalations';

export default function useTodayInhalations() {
  const inhalations = useInhalations();
  const [todayInhalations] = getTodayInhalations(inhalations);
  return todayInhalations;
}
