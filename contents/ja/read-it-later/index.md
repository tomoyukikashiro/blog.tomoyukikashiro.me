---
date: 2018-12-21
title: 「あとで読む」を支える技術
summary: 情報収集、inputを効率よくやるために気をつけていることを紹介します！
lang: ja
---


この記事は、[ex-KAYAC Advent Calendar 2018](https://qiita.com/advent-calendar/2018/ex-kayac)の20日目の記事です。

## 自己紹介

こんにちは、神代（かしろ）です。
2012年から約2年半ほど、面白法人カヤックで受託制作のフロントエンド開発に携わっていました。
退職後は、フリーランスエンジニアをしたり、2年弱、ニューヨークのスタートアップでエンジニアとして仕事をしたり、忙しくさせてもらってます。

## この記事について

フリーランスエンジニアになってからは、フロントエンド、サーバサイド両方の開発に参加しています。その方がいろいろ捗るので。
結果、現在では、サーバサイドは、Rails(ruby)、Django(python)、フロントエンドは、Vue,Reactと幅広く携わっています。

そうなってくると大変なのが日々のインプットです。
ブログ記事やアップデート情報のキャッチアップし、どこかに保存して、時間を見つけて読む。俗に言う、「あとで読む」を効率よく行う必要があります。


今日はこの記事で、自分なりの方法を紹介したいと思います。

## 概要

`集める方法`と`読ませる方法`に分けて紹介していきます。

`集める方法`では、情報収集をなるべく自動的にまた、限定して（範囲を絞って）集めます。
`読ませる方法`では、集まった情報を強制的に（自分に）読ませて、必要な作業はなるべく簡単にできるようにしてあります。

## 集める方法

全体の流れとしては、

- [https://zapier.com/](https://zapier.com/) で自動的に集めて
- [https://webtask.io/](https://webtask.io/) で絞って
- [https://getpocket.com/](https://getpocket.com/) に保存

しています。 

![Image from Gyazo](https://i.gyazo.com/1d9b3044aede506c23e93c6515a76d47.png)


## Zapierで集める

[https://zapier.com/](https://zapier.com/)は有名なので説明不要かもしれませんが、各種サービスを連携させたタスクとして実行できるサービスです。
私が主につかってるのは、

- ブログのRSSで記事が追加されたらPocketに登録
- 特定Youtubeチャンネルのビデオが追加されたらPocketに登録

なるべく一次情報？に触れたいので、利用しているフレームワークの公式ブログやGoogle,Firefoxのブログ、各種メジャーなカンファレンスのYoutubeチャンネルを収集元として登録してあります。

## Webtask.ioで絞る

[https://webtask.io/](https://webtask.io/)はサーバレスサービスで、簡単にサーバサイド環境とURLを用意することができます。
これは、AWS Lambdaでもなんでいいと思います。

該当のブログ記事を全部読みたいというのであればZapierでPocket登録タスクを用意すれば済むのですが、特定のトピックにだけ絞りたいということもあります。そうしないとすぐにPocketが更新情報であふれちゃうので。

たとえば、[Google Chrome Developer](https://www.youtube.com/channel/UCnUYZLuoy1rq1aVMwx4aTzw)のYoutubeチャンネルの中で[New In Chrome](https://www.youtube.com/playlist?list=PLNYkxOF6rcIDfz8XEA3loxY32tYh7CI3m)の情報だけほしいなんてこともあります。

![Image from Gyazo](https://i.gyazo.com/c68d772c52a31a02cc1805c9345d02a3.png)

Zapier自体にフィルター機能があるので、それをつかってもいいのですが、有料プランです。

そこで、ZapierではGoogle Chrome Developerチャンネルを監視し、更新情報をPocketではなく、用意したサーバレスに向けてPOSTさせます。（zapierのPOSTタスクは無料）

あとは、サーバレス環境で自由にフィルターし、Pocket APIを利用してPocketに登録させれば、情報の範囲を自由に、絞り込めます。(無料で)

## 読ませる方法

全体の流れとしては、

- [https://webtask.io/](https://webtask.io/) で、Pocket内記事を取り出す
- Slackに読む記事を通知
- Slackに記事の増減数を通知

![Image from Gyazo](https://i.gyazo.com/1facf68c0723a18fe79b115a065d6014.png)

とシンプルですが、いくつかポイントがあります。

## Webtask.ioで記事を取り出す

下記を毎日8時に定期実行して自分にその日読む記事を提示します。

- サーバレス内でPocket APIを利用して登録した最新3件を取り出す
- その3件を同様にAPIでarchiveしてしまう

ポイントとしては、

- 定期実行してslackに通知させることで、どれを読むか選ぶ手間を省きます
- 強制的にarchiveさせることで、「今日読まないと！」と自分を脅迫させます

## Slackに読む記事を通知

[![Image from Gyazo](https://i.gyazo.com/217a175a24798458c4657025d8faa9d0.png)](https://gyazo.com/217a175a24798458c4657025d8faa9d0)

ポイントとしては、

- slackの[Attaching interactive message menus](https://api.slack.com/docs/message-menus)を使ってPocketのタグ付を簡略化しています


通知させる際に、[Attaching interactive message menus](https://api.slack.com/docs/message-menus)の機能を使い、記事タイトルとリンクの他に記事にPocketのタグ付する候補をメニューとしてattachしておきます。
そうすることで、タグ付をslack内で完了させることができます。
メニューからタグを選んだら、サーバレス環境にPOSTし、Pocket APIを利用して記事のタグ付けをします。


## Slackに記事の増減数を通知

昨日10件の記事を「あとで読む」記事としてPocketに登録したのに、今日3件しか読んでいないと、どんどん溜まってしまいます。
3件以上読むべきか、どうかを判断するために、昨日からのPocket記事増減数をSlackに通知させます。

![Image from Gyazo](https://i.gyazo.com/3341ae2e37b85511a6eb4876e542d5c9.png)

そうするとで更に自分を追い込みます。

Webtask.ioは1URLごとに少量ですがJSONのストレージが付いてきます。
それを利用して増減数を計算しています。

面倒な件としては、Pocket APIには全件数を取得する方法がないので、検索APIをページ数分ループさせて全Pocketデータを取得して件数を出します。

## まとめ

いかがでしたでしょうか？誰かの手助けになれば嬉しいです。

### 集める方法

![Image from Gyazo](https://i.gyazo.com/1d9b3044aede506c23e93c6515a76d47.png)

### 読ませる方法

![Image from Gyazo](https://i.gyazo.com/1facf68c0723a18fe79b115a065d6014.png)



















