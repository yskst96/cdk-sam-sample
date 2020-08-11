#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkAppSamStack } from '../lib/cdk-sam-app-stack';
import { CdkAppIamStack } from '../lib/cdk-app-iam-stack';
import { CdkAppStack, AppStackProps } from '../lib/cdk-app-stack';


const app = new cdk.App();

// contextを使って環境ごとの設定が可能
//　https://docs.aws.amazon.com/ja_jp/cdk/latest/guide/get_context_var.html
// app.node.tryGetContext('hoge')

//IAM系
const IAMStack = new CdkAppIamStack(app, 'CdkAppIamStack');

//アプリStack用props
const appStackProps: AppStackProps = { lambdaRoleExportName: IAMStack.lambdaRoleExportName }

//アプリ用(samなし)
const AppStack = new CdkAppStack(app, 'CdkAppStack', appStackProps);

//依存関係の設定
AppStack.addDependency(IAMStack)

//アプリ用(samあり) codeUriの振る舞いのところに不備があるのでこっちは非推奨
new CdkAppSamStack(app, 'CdkAppSamStack');
