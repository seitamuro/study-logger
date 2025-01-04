import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { TimerRecord, TimerRecordSchema, TimerRecordStatus } from 'types/models';

const client = new DynamoDBClient({});

export const validateTimerRecord = (record: TimerRecord): boolean => {
  const result = TimerRecordSchema.safeParse(record);
  if (result.success) {
    return true;
  } else {
    return false;
  }
};

export const updateTimerRecord = async ({
  userId,
  timestamp,
  status,
  duration,
}: {
  userId: string;
  timestamp: string;
  status: TimerRecordStatus;
  duration: number;
}) => {
  const record = {
    userId,
    timestamp,
    status,
    duration,
  };
  if (validateTimerRecord(record)) {
    const params: UpdateItemCommandInput = {
      TableName: process.env.TIMER_TABLE_NAME,
      Key: {
        userId: { S: record.userId },
        timestamp: { S: record.timestamp },
      },
      UpdateExpression: 'SET #status = :status, #duration = :duration',
      ExpressionAttributeNames: { '#status': 'status', '#duration': 'duration' },
      ExpressionAttributeValues: {
        ':status': { S: record.status },
        ':duration': { N: `${record.duration}` },
      },
    };

    const command = new UpdateItemCommand(params);
    return client.send(command);
  }

  throw new Error('Invalid TimerRecord');
};

export const startTimerRecord = async (userId: string, duration: number = 25 * 60) => {
  const record = {
    userId,
    timestamp: new Date().toISOString(),
    status: TimerRecordStatus.InProgress,
    duration: duration,
  };
  return updateTimerRecord(record);
};
