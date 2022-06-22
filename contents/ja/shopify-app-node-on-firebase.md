---
date: 2022-06-22
title: Shopify App Node を Firebase にデプロイするシステム構成
summary: Shopify App Node を Firebase にのせて動かすためのシステム構成案、紆余曲折をまとめてみました。
slug: shopify-app-node-on-firebase
lang: ja
tags:
  - firebase
  - shopify
image: https://i.gyazo.com/66235c76f611a9395c6254707e285b20.png
---

## はじめに

Shopify App Node は、公式に Heroku にデプロイする方法が提供されています。しかし、個人的に Heroku は、費用が高いのと DB や CDN などインフラ、ミドルウェアを追加するたびに様々なサービスを連携させるのが好みではなく、包括的にインフラを構築できる Google Could Platform または Firebase で方法を模索していました。その過程と結論を残しておこうと思います。

## 構成案1： Firebase Hosting and Functions

まずは、一番はじめに思いつく素直な構成です。

![image](https://i.gyazo.com/f912264ba56d3aa456edda8776254c0d.png)

Firebase Hosting で Functions を rewrite してあげて、`/auth` や `/webhooks` 、html を配信する構成です。
html の配信で Hosting を使わない理由は、Shopify App Node でもページへアクセスした場合に、アプリをインストール済みかどうか判定して、必要であれば OAuth へリダイレクトするロジックを html 配信の前に実行するためです。

### 結論

結論として、この構成案ではうまくいきませんでした。
Shopify App Node はその仕組上、[2つの HTTP Cookie を使います](https://blog.tomoyukikashiro.me/post/ja/two-http-cookies-shopify-app-node-uses/)。しかし、すべての endpoint を束ねている Firebase Hosting は [HTTP Cookie を例外を除いて利用できません](https://firebase.google.com/docs/hosting/manage-cache?hl=ja#using_cookies)。よって Shopify App Node は期待通り動きませんでした。

ちなみに Firebase Hosting でも使える唯一の例外 Cookie 名である `__session` を Shopify App Node がセッション管理に使う `shopify_app_session` の代わりに使う案も考えました。

```javascript
Shopify.Auth.SESSION_COOKIE_NAME = "shopify_app_session";
```

しかし、これでもうまくいきませんでした。 Cookie 生成ロジックを持ってる [@shopify/shopify-api](https://github.com/Shopify/shopify-node-api) は Cookie の操作に [cookies](https://github.com/pillarjs/cookies) というモジュールを利用しています。このモジュールでは暗号化 cookie を生成する際に、Cookie 名の最後に `.sig` をつける処理が含まれています。つまり `shopify_app_session` という Cookie 名をセットしても、 `shopify_app_session.sig` になってしまい、Firebase Hosting が許可しない Cookie 名で使えませんでした。

## 構成案2：`/auth` だけ Firebase Hosting を使わない

構成案1の問題点である、「Cookie が使えない」という部分に対処した構成です。
Shopify App Node が使う Cookie は `/auth` の endpoint でセットされます。よってこの endpoint のみ Firebase Hosting を通さなければうまくいくはずです。

![image](https://i.gyazo.com/9f7eb5148088f52a01861e9ba152920f.png))

### 結論

この構成でもうまくいきませんでした。
OAuth 認証をする際に、 `/auth` へリダイレクトする処理ですが、一見すると、 `×××.web.app/index.html` から `us-central1-×××.cloudfunctions.net/auth` にリダイレクトでうまくいきそうでしたが、できませんでした。

Firebase Hosting で rewrite しているとはいえ、すべての function の実態は `us-central1-×××.cloudfunctions.net` にあります。
つまり、index.html を返している functions から見れば、 `us-central1-×××.cloudfunctions.net/index.html` へのリクエストを `us-central1-×××.cloudfunctions.net/auth` にリダイレクトすることになります。

詳しく仕様までは追えていませんでしたが、 **同一ドメインのリダイレクトは、たとえ明示的にドメインを指定しても省略される** ようです。
つまり、 `us-central1-×××.cloudfunctions.net/index.html` へのリクエストを `us-central1-×××.cloudfunctions.net/auth` にリダイレクトする処理を書いても、 `/auth` （ドメインを除いたパスだけ）へリダイレクトする HTTP レスポンスを返します。

そのまま、Firebase Hosting を通ってブラウザにレスポンスが戻るので結果、`×××.web.app/index.htm` のリクエストで認証するためにリダイレクトすると `×××.web.app/auth` へリダイレクトするレスポンスが返ってしまい、Firebase Hosting を使っていない `/auth` へリクエストをリダイレクトさせることができませんでした。

よってこの構成案もボツです。

## 構成案3：Firebase Hosting の rewrite を使わない

諸悪の根源が Firebase Hosting の rewrite なのでそれを一切つかない構成です。

![image](https://i.gyazo.com/26569d81605e6607c30114f74e94de6f.png)

### 結論

成功！動きました。Firebase Hosting で rewrite させる構成より、ローカルも本番環境も少し複雑になりますが、動かくことは問題なさそうです。しかし、せっかく、Firebse Hosting で HTTPS のドメイン（`×××.web.app`）があるのに使えないのがもったいない気がします。


## 構成案4：OAuth認証の endpoint のみ Cloud Functions を使う

何かと問題になる `/auth` の endpoint。
Cookie を使うために Firebase Hosting を使えず、他の Firebase Functions からリダイレクトを正しくするために別ドメインで動かす必要があります。なので、それだけ 素の Google Cloud Functions に乗せて動かす構成です。


![image](https://i.gyazo.com/c3536f2fa1147e990833d408ab52f006.png)

### 結論

成功！動きました。 `構成案4` に比べていくらか、構成がシンプルなのと Firebase Hositng のドメインをそのまま利用できるのが良い点です。

欠点は、ローカル、本番環境ともに Google Cloud Functions と Firebase Functions を用意する必要があるのでぱっとみわかりにくい点。
Google Cloud Functions である `/auth` のシステムは、認証終わったあとの戻し先として Firebase Functions のドメインを知る必要があり、また、Firebase Functions は、認証する際に `/auth` である Google Cloud Functions のドメインをしる必要があるので、インフラがお互いに依存している点が気になるところです。

## まとめ

- 構成案3：Firebase Hosting の rewrite を使わない
- 構成案4：OAuth認証の endpoint のみ Cloud Functions を使う

のどちらがいいかは、好みの問題なので好きな方を使えばいいかと思います！
