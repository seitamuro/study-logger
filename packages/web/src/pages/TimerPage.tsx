import { Authenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

const TIMER_DURATION = 25 * 60; // 25分（秒単位）

export const TimerPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_DURATION);
  };

  const progress = ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const circumference = 2 * Math.PI * 90; // 円の円周（r=90）
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Authenticator>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
      }}>
        <h1>Timer</h1>

        <div style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 0'
        }}>
          {/* プログレスバー */}
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            style={{
              position: 'absolute',
              transform: 'rotate(-90deg)'
            }}
          >
            {/* 背景の円 */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="10"
            />
            {/* プログレス円 */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: 'stroke-dashoffset 0.5s ease'
              }}
            />
          </svg>

          {/* タイマー表示 */}
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#333'
          }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px'
        }}>
          <button
            onClick={toggleTimer}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: isRunning ? '#f44336' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {isRunning ? '停止' : '開始'}
          </button>

          <button
            onClick={resetTimer}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            リセット
          </button>
        </div>

        {timeLeft === 0 && (
          <div style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f8f8f8',
            borderRadius: '5px'
          }}>
            <h2>時間が経過しました</h2>
            <p>進捗画像をアップロードしてください</p>
            {/* TODO: アップロードフォームを追加 */}
          </div>
        )}
      </div>
    </Authenticator>
  );
};
