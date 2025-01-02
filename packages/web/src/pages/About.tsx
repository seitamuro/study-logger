import { Authenticator } from '@aws-amplify/ui-react';

export const AboutPage = () => {
  return (
    <>
      <Authenticator>
        <h1>About</h1>
        <div>This is AboutPage</div>
      </Authenticator>
    </>
  );
};
