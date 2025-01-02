import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useMyAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useMyAuth must be used within an AuthProvider');
  }

  if (!isLoading && (!context.sessionData || !context.sessionData.credentials)) {
    setIsLoading(true);
    context
      .refetchAuthData()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }

  return context;
};
