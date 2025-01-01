import { useEffect, useState } from 'react';
import { useHttp } from '../hooks/useHttp';

export const HomePage = () => {
  const { get, post } = useHttp();

  const { data: hello } = get('/hello-auth');
  const { data: time } = get<{ time: string }>('/time', {
    refreshInterval: 3000,
  });

  const [echo, setEcho] = useState<string>('');
  useEffect(() => {
    post(
      '/echo',
      { ato: 'z' },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => setEcho(res.data))
      .catch((err) => console.error(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>Home</h1>
      <div>This is HomePage</div>
      <div>{hello}</div>
      {time && <div>Time: {`${time.time}`}</div>}
      <div>echo: {`${JSON.stringify(echo)}`}</div>
    </>
  );
};
