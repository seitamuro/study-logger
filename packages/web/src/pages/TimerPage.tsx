import { Authenticator } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { Timer } from '../components/Timer';
import { useTimerRecords } from '../hooks/useTimerRecords';

export const TimerPage: React.FC = () => {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const { postTimerRecord } = useTimerRecords();
  const duration = 5; // seconds

  return (
    <Authenticator>
      <Timer
        duration={duration}
        timeResetCallback={() => setIsTimeUp(false)}
        timeUpCallback={() => {
          setIsTimeUp(true);
          postTimerRecord(duration);
        }}
      />
      {isTimeUp && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f8f8f8',
            borderRadius: '5px',
          }}
        >
          <h2>時間が経過しました</h2>
          <p>進捗画像をアップロードしてください</p>
          {/* TODO: アップロードフォームを追加 */}
        </div>
      )}
    </Authenticator>
  );
};
