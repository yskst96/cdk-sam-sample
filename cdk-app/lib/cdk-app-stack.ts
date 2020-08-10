import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as iam from '@aws-cdk/aws-iam'
import * as s3 from '@aws-cdk/aws-s3'
import * as s3Deployment from '@aws-cdk/aws-s3-deployment'

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

    //Laayer定義

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
    const s3Bucket = new s3.Bucket(this, 'cdk-app-s3-bucket', { bucketName: 'cdk-app-s3-bucket', websiteIndexDocument: 'index.html', publicReadAccess: true })

    // s3 deployment クライアントの資源をビルドしておきたい
    new s3Deployment.BucketDeployment(this, 'cdk-app-s3-bucket-deployment',
      {
        sources: [s3Deployment.Source.asset('../client/dist')],
        destinationBucket: s3Bucket,
        retainOnDelete: false,
        cacheControl: [s3Deployment.CacheControl.noCache()]
      })

    //APIGateway

    //DynamoDBテーブル



  }
}
