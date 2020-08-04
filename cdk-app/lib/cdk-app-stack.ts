import * as cdk from '@aws-cdk/core';
import * as logs from '@aws-cdk/aws-logs'
import * as sam from '@aws-cdk/aws-sam'
import * as iam from '@aws-cdk/aws-iam'

const LAMBDA_FUNC1_NAME = "cdk-app-function-1"
const LAMBDA_SUBSCRIPTION_NAME = "cdk-app-subscription"

/**
 * CDKによるサーバレスアプリ用Stack
 */
export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //lamba用IAMロール
    const roleName = "cdk-app-lambda-role"
    const dynamoPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess')
    const lambda3Policy = iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaFullAccess')
    const lambdaRole = new iam.Role(this, roleName, { roleName, assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'), managedPolicies: [dynamoPolicy, lambda3Policy] })

    cdk.Tag.add(lambdaRole, 'app', 'cdk-app')


    //lambda関数1
    const lambda1 = new sam.CfnFunction(this, LAMBDA_FUNC1_NAME,
      {
        runtime: "nodejs12.x",
        handler: "index.handler",
        functionName: LAMBDA_FUNC1_NAME,
        codeUri: "lambda/lambda1",
        memorySize: 128,
        role: lambdaRole.roleArn
      })

    //subscription filter用Lambda関数
    const subscriptionFilterEvent: sam.CfnFunction.EventSourceProperty = {
      type: "CloudWatchLogs",
      properties: { filterPattern: "[Error]", logGroupName: `/aws/lambda/${LAMBDA_SUBSCRIPTION_NAME}` }
    }

    const subscriptionLambda = new sam.CfnFunction(this, LAMBDA_SUBSCRIPTION_NAME, {
      runtime: "nodejs12.x",
      handler: "index.handler",
      functionName: LAMBDA_SUBSCRIPTION_NAME,
      codeUri: "lambda/subscription",
      memorySize: 128,
      role: lambdaRole.roleArn,
      events: { subscriptionFilterEvent }
    })

    cdk.Tag.add(lambda1, 'app', 'cdk-app')
    cdk.Tag.add(subscriptionLambda, 'app', 'cdk-app')


    // ロググループ
    const lambda1LogGroup = new logs.LogGroup(this, `${LAMBDA_FUNC1_NAME}-loggroup`, { logGroupName: `/aws/lambda/${LAMBDA_FUNC1_NAME}`, retention: logs.RetentionDays.ONE_YEAR })
    const subscriptionLogGroup = new logs.LogGroup(this, `${LAMBDA_SUBSCRIPTION_NAME}-loggroup`, { logGroupName: `/aws/lambda/${LAMBDA_SUBSCRIPTION_NAME}`, retention: logs.RetentionDays.ONE_YEAR })

    cdk.Tag.add(lambda1LogGroup, 'app', 'cdk-app')
    cdk.Tag.add(subscriptionLogGroup, 'app', 'cdk-app')

    //APIGateway

    //DynamoDBテーブル



  }
}
