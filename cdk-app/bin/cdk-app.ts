#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkAppSamStack } from '../lib/cdk-sam-app-stack';
import { CdkAppIamStack } from '../lib/cdk-app-iam-stack';
import { CdkAppStack } from '../lib/cdk-app-stack';


const app = new cdk.App();
new CdkAppStack(app, 'CdkAppStack');
new CdkAppSamStack(app, 'CdkAppSamStack');
new CdkAppIamStack(app, 'CdkAppIamStack');
