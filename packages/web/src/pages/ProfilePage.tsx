import { Authenticator } from '@aws-amplify/ui-react';
import { useMyAuth } from '../hooks/useMyAuth';

export const ProfilePage = () => {
  const { sessionData } = useMyAuth();

  return (
    <Authenticator>
      <div>
        <h1>プロフィール</h1>
        <p>名前：implemented</p>
        <p>メールアドレス：{`${sessionData?.tokens?.idToken?.payload['email']}`}</p>
        <p>{JSON.stringify(sessionData)}</p>
      </div>
    </Authenticator>
  );
};
