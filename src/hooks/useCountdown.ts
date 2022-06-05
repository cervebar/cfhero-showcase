import { useCallback, useEffect, useState } from 'react';

import useInterval from './useInterval';

export default function useCountdown(value: number, onComplete: () => void) {
  const [time, setTime] = useState(value);

  const onTick = useCallback(
    stop =>
      setTime(current => {
        if (!current) {
          onComplete();
          stop();
        }

        return current - 1;
      }),
    [setTime, onComplete],
  );

  const [start] = useInterval(onTick, true);
  useEffect(start, [start]);
  return time;
}
