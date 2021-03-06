# 概要

CDK を使ったサーバレスアプリのサンプル

## アプリ

下記のリソースを CDK で構築
@aws-cdk/aws-sam を使う ver とそうじゃない ver を試す

- API Gateway
- Lambda
- CloudWatch
  subscription-filter を設定し lambda のログを集約
  アラートメールにログの詳細を表示する

## パイプライン

上記のリソースを Github への commit をトリガにデプロイするパイプラインを
CDK で構築

## 手順

- 初期設定

```
mkdir cdk-app
cd cdk-app
cdk init app --language=typescript
cdk bootstrap
```

- Cfn のテンプレートを出力してデプロイ(sam cli 利用)

```
npm run build
cdk synth > app-template.yaml

sam package -t app-template.yaml --s3-bucket yskst96-sam-resources --output-template-file packaged.yaml
sam deploy --template-file packaged.yaml --stack-name cdk-sam-app --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
```

- CLI から直接デプロイする場合

```
npm run build
cdk deploy <Stack名> //samのconstruct(CdkAppSamStack)使うとcodeUriの変換がないためエラーになる...
```

- 差分比較

```
npm run build
cdk diff
```

## 参考にできそうなサイト

- https://github.com/aws-samples/aws-serverless-app-sam-cd
- codeUri の問題で cdk deploy が落ちる際のワークアラウンド https://github.com/aws/aws-cdk/issues/716
