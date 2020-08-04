# 概要

CDK を使ったサーバレスアプリのサンプル

## アプリ

下記のリソースを CDK で構築

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

- Cfn のテンプレートを標準出力に出力

```
npm run build
cdk synth > app-template.yaml
```

- CLI から直接デプロイする場合

```
npm run build
cdk deploy
```

- 差分比較

```
npm run build
cdk diff
```

## 参考にできそうなサイト

- https://github.com/aws-samples/aws-serverless-app-sam-cd
- codeUri の問題で cdk deploy が落ちる際のワークアラウンド https://github.com/aws/aws-cdk/issues/716
