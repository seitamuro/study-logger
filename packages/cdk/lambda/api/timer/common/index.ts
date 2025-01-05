import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
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

export const updateTimerRecord = async ({ userId, timestamp, status, duration }: TimerRecord) => {
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

export const getTimerRecords = async (userId: string, year: number, month: number) => {
  const params: QueryCommandInput = {
    TableName: process.env.TIMER_TABLE_NAME,
    KeyConditionExpression: 'userId = :userId AND #timestamp BETWEEN :start AND :end',
    ExpressionAttributeNames: { '#timestamp': 'timestamp' },
    ExpressionAttributeValues: {
      ':userId': { S: userId },
      ':start': { S: `${year}-${month.toString().padStart(2, '0')}-01T00:00:00.000Z` },
      ':end': { S: `${year}-${(month + 1).toString().padStart(2, '0')}-01T00:00:00.000Z` },
    },
    ScanIndexForward: true, // ascending order
  };

  const command = new QueryCommand(params);
  const response = await client.send(command);

  if (response.Items && response.Items.length > 0) {
    const items: TimerRecord[] = response.Items.map((item) => {
      return {
        userId: item.userId.S!,
        timestamp: item.timestamp.S!,
        status: item.status.S! as TimerRecordStatus,
        duration: parseInt(item.duration.N!),
      };
    });
    return items;
  } else {
    return undefined;
  }
};
