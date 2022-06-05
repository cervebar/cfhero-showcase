import { useCallback, useState } from 'react';

import useInterval from './useInterval';

export default function useTimer(): [
  number,
  () => void,
  () => void,
  (set: number | ((t: number) => number)) => void,
  boolean,
] {
  const [time, setTime] = useState(0);
  const onTick = useCallback(() => setTime(t => t + 1), [setTime]);
  const [start, stop, running] = useInterval(onTick);
  return [time, start, stop, setTime, running];
}
