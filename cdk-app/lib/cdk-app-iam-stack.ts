import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam'
import * as lambda from '@aws-cdk/aws-lambda'

/**
 * CDKによるアプリ用Stack
 * IAM周り
 */
export class CdkAppIamStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //lamba用IAMロール
    const roleName = "cdk-app-lambda-role"
    const dynamoPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess')
    const lambda3Policy = iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaFullAccess')
    const lambdaRole = new iam.Role(this, roleName, { roleName, assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'), managedPolicies: [dynamoPolicy, lambda3Policy] })

    cdk.Tag.add(lambdaRole, 'app', 'cdk-app')

    //IAMをoutputしたい

  }
}
