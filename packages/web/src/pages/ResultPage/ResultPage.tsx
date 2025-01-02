import { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import "./custom-calendar.css";

type Value = Date | null | [Date | null, Date | null];

const results = [
  { date: '2025-01-01', time: 25 },
  { date: '2025-01-02', time: 125 },
  { date: '2025-01-04', time: 25 },
  { date: '2025-01-05', time: 125 },
]

export const ResultPage = () => {
  const [value, setValue] = useState<Value>(new Date(2025, 0, 1));

  // 日付ごとの学習時間を取得
  const getTimeForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const result = results.find(r => r.date === dateStr);
    console.log(`${date.toISOString()}: ${result?.time || 0}`);
    return result?.time || 0;
  };

  // タイル（日付）のクラス名を設定
  const getTileClassName = ({ date }: { date: Date }) => {
    const time = getTimeForDate(date);
    if (time === 0) return '';
    if (time <= 30) return 'study-time-low';
    if (time <= 60) return 'study-time-medium';
    return 'study-time-high';
  };

  // タイルの内容をカスタマイズ
  const getTileContent = ({ date }: { date: Date }) => {
    const time = getTimeForDate(date);
    return time > 0 ? (
      <div className="study-time-tooltip">{time}分</div>
    ) : null;
  };

  return (
    <div className="result-page">
      <h1>学習記録カレンダー</h1>
      <style>{`
        .result-page {
          padding: 20px;
        }
        
        .study-time-low {
          background-color: rgba(0, 128, 0, 0.2);
        }
        
        .study-time-medium {
          background-color: rgba(0, 128, 0, 0.5);
        }
        
        .study-time-high {
          background-color: rgba(0, 128, 0, 0.8);
        }
        
        .study-time-tooltip {
          font-size: 0.8em;
          color: #666;
        }
        
        /* react-calendarのスタイルカスタマイズ */
        .react-calendar {
          width: 100%;
          max-width: 800px;
          background: white;
          border: 1px solid #a0a096;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.125em;
        }
        
        .react-calendar__tile {
          position: relative;
          height: 100px;
        }
      `}</style>
      <Calendar
        value={value}
        locale='ja-JP'
        onChange={setValue}
        tileClassName={getTileClassName}
        tileContent={getTileContent}
      />
    </div>
  );
};
