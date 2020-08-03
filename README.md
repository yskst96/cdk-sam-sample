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
