import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as iam from '@aws-cdk/aws-iam'


const LAMBDA_FUNC2_NAME = "cdk-app-function-2"

export interface AppStackProps extends cdk.StackProps {
  lambdaRoleExportName: string
}

/**
 * CDKによるサーバレスアプリ用Stack
 * SAM使わない version
 */
export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    //Laayer

    //lamba用IAMロールをimportしたい
    const roleArn = cdk.Fn.importValue(props.lambdaRoleExportName)
    const lambdaRole = iam.Role.fromRoleArn(this, 'cdk-app-function-2-role-arn', roleArn)

    //lambda関数1
    new lambda.Function(this, LAMBDA_FUNC2_NAME, {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.AssetCode.fromAsset('lambda/function2'),
      role: lambdaRole,
      functionName: LAMBDA_FUNC2_NAME,
      memorySize: 128
    })

    // S3

    //APIGateway

    //DynamoDBテーブル



  }
}
