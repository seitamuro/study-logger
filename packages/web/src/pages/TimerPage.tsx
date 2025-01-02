import { Authenticator } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { Timer } from '../components/Timer';

export const TimerPage: React.FC = () => {
  const [isTimeUp, setIsTimeUp] = useState(false);

  return (
    <Authenticator>
      <Timer
        duration={5}
        timeResetCallback={() => setIsTimeUp(false)}
        timeUpCallback={() => setIsTimeUp(true)}
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
