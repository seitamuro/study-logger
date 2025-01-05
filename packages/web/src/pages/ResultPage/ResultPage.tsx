import 'react-calendar/dist/Calendar.css';
import { useTimerRecords } from '../../hooks/useTimerRecords';
import './custom-calendar.css';

export const ResultPage = () => {
  const { getTimerRecords } = useTimerRecords();
  const { data: records } = getTimerRecords(2025, 1);

  return (
    <div className="result-page">
      <h1>学習記録カレンダー</h1>
      {records &&
        records.map((r) => (
          <p key={r.timestamp}>
            {r.timestamp}: {r.duration}分
          </p>
        ))}
    </div>
  );
};
