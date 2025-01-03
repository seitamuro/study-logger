import * as cdk from 'aws-cdk-lib';
import * as api from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

interface ApiStackProps extends cdk.StackProps {
  userPoolId: string;
  userPoolClientId: string;
}

export class ApiStack extends cdk.Stack {
  public TimerTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    // Lambda-lith
    const lambda = new NodejsFunction(this, 'ApiHandler', {
      entry: 'lambda/index.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_20_X,
      bundling: {
        sourceMap: true,
      },
      environment: {
        USER_POOL_ID: props.userPoolId,
        USER_POOL_CLIENT_ID: props.userPoolClientId,
      },
    });

    // タイマー関係
    const TimerTable = new dynamodb.Table(this, 'TimerTable', {
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    TimerTable.grantReadWriteData(lambda);
    lambda.addEnvironment('TIMER_TABLE_NAME', TimerTable.tableName);

    const restApi = new api.LambdaRestApi(this, 'Api', {
      handler: lambda,
    });

    // エンドポイントを出力
    new cdk.CfnOutput(this, 'TimerTableName', {
      value: TimerTable.tableName,
    });
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: restApi.url,
    });
  }
}
