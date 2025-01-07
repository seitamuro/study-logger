import type { Message, PostTimerRecordRequest, TimerRecord } from 'types/models';
import { useHttp } from './useHttp';

export const useTimerRecords = () => {
  const { get: _get, post: _post } = useHttp();

  return {
    getTimerRecords: (year: number, month: number) => {
      return _get<TimerRecord[]>(`/timer/records/${year}/${month}`);
    },
    postTimerRecord: (duration: number) => {
      return _post<Message, PostTimerRecordRequest>('/timer/record', { duration });
    },
  };
};
