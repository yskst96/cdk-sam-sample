import * as cdk from '@aws-cdk/core';
import * as logs from '@aws-cdk/aws-logs'
import * as sam from '@aws-cdk/aws-sam'
import * as iam from '@aws-cdk/aws-iam'

const LAMBDA_FUNC2_NAME = "cdk-app-function-2"

/**
 * CDKによるサーバレスアプリ用Stack
 * SAM使わない version
 */
export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //lamba用IAMロールをimportしたい


    //lambda関数1

    // S3

    //APIGateway

    //DynamoDBテーブル



  }
}
