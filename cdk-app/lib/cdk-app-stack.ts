import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as logs from '@aws-cdk/aws-logs'
import * as apigw from '@aws-cdk/aws-apigateway'
import * as iam from '@aws-cdk/aws-iam'
import * as s3 from '@aws-cdk/aws-s3'
import * as s3Deployment from '@aws-cdk/aws-s3-deployment'
import * as dynamodb from '@aws-cdk/aws-dynamodb'

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


    //lamba用IAMロールをimportしたい
    const roleArn = cdk.Fn.importValue(props.lambdaRoleExportName)
    const lambdaRole = iam.Role.fromRoleArn(this, 'cdk-app-function-2-role-arn', roleArn)

    // Lambda用Log Group
    // 勝手に作られるけどCDKで管理するために明示的に作っとくのが良い
    new logs.LogGroup(this, `cdk-app-lambda-loggroup`, { logGroupName: `/aws/lambda/${LAMBDA_FUNC2_NAME}`, retention: logs.RetentionDays.FIVE_DAYS })

    //Laayer定義
    const layer = new lambda.LayerVersion(this, 'cdk-app-lambda-layer', {
      layerVersionName: 'cdk-app-layer',
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X],
      code: lambda.AssetCode.fromAsset('lambda/layer', { exclude: ['*.ts'] }),
      license: 'MIT'
    })

    //lambda関数
    const lambdaFunction = new lambda.Function(this, LAMBDA_FUNC2_NAME, {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.AssetCode.fromAsset('lambda/function2', { exclude: ['*.ts'] }),
      role: lambdaRole,
      functionName: LAMBDA_FUNC2_NAME,
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      environment: { FOO: 'foo_val' },
      layers: [layer]
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
    // deploy:falseにしないとprod stageが勝手に作られる
    const api = new apigw.RestApi(this, 'cdk-app-apigw', {
      restApiName: 'CdkAppAPI', deploy: false
    })

    // lambda統合
    const lambdaIntegration = new apigw.LambdaIntegration(lambdaFunction, { proxy: true })

    // リソース、メソッド設定
    const appResource = api.root.addResource('api')
    appResource.addMethod("GET", lambdaIntegration)


    //CORSの設定(リソースごとにやるのめんどいな)
    appResource.addMethod("OPTIONS", new apigw.MockIntegration({
      integrationResponses: [{
        statusCode: "200",
        responseParameters: {
          "method.response.header.Access-Control-Allow-Headers":
            "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
          "method.response.header.Access-Control-Allow-Origin": "'*'",
          "method.response.header.Access-Control-Allow-Credentials": "'false'",
          "method.response.header.Access-Control-Allow-Methods": "'OPTIONS,GET,PUT,POST,DELETE'",
        }
      }],
      passthroughBehavior: apigw.PassthroughBehavior.NEVER,
      requestTemplates: {
        "application/json": "{\"statusCode\": 200}"
      }
    }), {
      methodResponses: [{
        statusCode: "200",
        responseParameters: {
          "method.response.header.Access-Control-Allow-Headers": true,
          "method.response.header.Access-Control-Allow-Origin": true,
          "method.response.header.Access-Control-Allow-Credentials": true,
          "method.response.header.Access-Control-Allow-Methods": true,
        },
        responseModels: {
          "application/json": new apigw.EmptyModel()
        },
      }]
    })

    // apigwのaccess log用
    const apigwAccessLogGroup = new logs.LogGroup(this, "cdk-app-apigw-accesslog");

    // dev stageとそのデプロイメント
    const apiDeployment = new apigw.Deployment(this, 'cdk-app-apigw-dev-deployment', { api: api })
    new apigw.Stage(this, 'cdk-app-apigw-dev-stage', {
      deployment: apiDeployment,
      stageName: 'dev',
      accessLogDestination: new apigw.LogGroupLogDestination(apigwAccessLogGroup),
      accessLogFormat: apigw.AccessLogFormat.custom(
        `reqid:${apigw.AccessLogField.contextRequestId()} errMsg:${apigw.AccessLogField.contextErrorMessage()} errMsgStr:${apigw.AccessLogField.contextErrorMessageString()} path:${apigw.AccessLogField.contextPath()} status:${apigw.AccessLogField.contextStatus()}`
      )
    })

    //DynamoDBテーブル
    const ddbTable = new dynamodb.Table(this, 'cdk-app-ddb-table', {
      tableName: 'CcdkAppTable',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'date', type: dynamodb.AttributeType.STRING },
      timeToLiveAttribute: 'ttl',
      pointInTimeRecovery: true
    })

    // GSI
    ddbTable.addGlobalSecondaryIndex({
      indexName: 'user-index',
      partitionKey: { name: 'user', type: dynamodb.AttributeType.STRING }
    })


  }
}
