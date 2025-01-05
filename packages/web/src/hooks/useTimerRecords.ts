import type { TimerRecord } from 'types/models';
import { useHttp } from './useHttp';

export const useTimerRecords = () => {
  const { get: _get } = useHttp();

  return {
    getTimerRecords: (year: number, month: number) => {
      return _get<TimerRecord[]>(`/timer/records/${year}/${month}`);
    },
  };
};
