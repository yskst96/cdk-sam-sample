#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkAppSamStack } from '../lib/cdk-sam-app-stack';
import { CdkAppIamStack } from '../lib/cdk-app-iam-stack';
import { CdkAppStack } from '../lib/cdk-app-stack';


const app = new cdk.App();
//IAM系
new CdkAppIamStack(app, 'CdkAppIamStack');

//アプリ用(samなし)
new CdkAppStack(app, 'CdkAppStack');

//アプリ用(samあり)
new CdkAppSamStack(app, 'CdkAppSamStack');
