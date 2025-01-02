import { AuthSession, fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export type AuthContextType = {
  sessionData: AuthSession | null;
  refetchAuthData: () => Promise<void>;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionData, setSessionData] = useState<AuthSession | null>(null);

  const fetchAuthData = async () => {
    try {
      const _sessionData = await fetchAuthSession();
      setSessionData(_sessionData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        sessionData: sessionData,
        refetchAuthData: fetchAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
