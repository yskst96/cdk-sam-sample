#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkAppSamStack } from '../lib/cdk-sam-app-stack';
import { CdkAppIamStack } from '../lib/cdk-app-iam-stack';
import { CdkAppStack, AppStackProps } from '../lib/cdk-app-stack';


const app = new cdk.App();
//IAM系
const IAMStack = new CdkAppIamStack(app, 'CdkAppIamStack');

const appStackProps: AppStackProps = { lambdaRoleExportName: IAMStack.lambdaRoleExportName }

//アプリ用(samなし)
const AppStack = new CdkAppStack(app, 'CdkAppStack', appStackProps);

//依存関係の設定
AppStack.addDependency(IAMStack)

//アプリ用(samあり)
new CdkAppSamStack(app, 'CdkAppSamStack');
