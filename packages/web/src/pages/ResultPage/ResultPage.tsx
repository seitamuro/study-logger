import { Authenticator } from '@aws-amplify/ui-react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useTimerRecords } from '../../hooks/useTimerRecords';
import './custom-calendar.css';

export const ResultPage = () => {
  const { getTimerRecords } = useTimerRecords();
  const { data: records } = getTimerRecords(2025, 1);
  const [totalTime, setTotalTime] = useState(0);

  const durationLabel = (seconds: number): string => {
    const _minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const _seconds = (seconds % 60).toString().padStart(2, '0');

    return `${_minutes}分${_seconds}秒`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    if (!records) return;
    setTotalTime(records.reduce((acc, record) => acc + record.duration, 0));
  }, [records]);

  return (
    <Authenticator>
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          学習記録カレンダー
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 800, width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { borderBottom: '2px solid black' } }}>
                <TableCell sx={{ fontSize: '1rem', fontWeight: 500 }}>日時</TableCell>
                <TableCell sx={{ fontSize: '1rem', fontWeight: 500 }}>学習時間</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records &&
                records.map((record) => (
                  <TableRow key={record.timestamp} hover>
                    <TableCell>{formatDate(record.timestamp)}</TableCell>
                    <TableCell>{durationLabel(record.duration)}</TableCell>
                  </TableRow>
                ))}
              <TableRow sx={{ '& td': { borderTop: '2px solid black' } }}>
                <TableCell>合計</TableCell>
                <TableCell>{durationLabel(totalTime)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Authenticator>
  );
};
