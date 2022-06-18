---
date: 2022-06-18
title: Shopify App Node で使われる2つの HTTP Cookie
summary: Shopify App Node で使われる「shopify_app_session」と「shopify_top_level_oauth」の2つの Cookie について説明します。
slug: two-http-cookies-shopify-app-node-uses
lang: ja
tags:
  - cookie
  - shopify
image: https://i.gyazo.com/ab66685829e9325dc07341be5c58a2a5.png
---

## 背景

昨今の 3rd party cookie 規制強化の流れで Shopify App で利用する認証 cookie も影響を受けて、2020年に Shopify Embedded App が受け取る Shopify Admin の認証情報を cookie に依存しない実装に変わりました。

https://github.com/Shopify/shopify-app-template-node/pull/493

具体的には、 Shopify Admin に embedded されたアプリケーションは、Shopify App Bridge を経由して、親 frame である Shopify Admin のセッション情報（id や shop の url) を JWT の形式で受け取ります。

## 疑問

とはいえ、[Shopify App Node](https://github.com/Shopify/shopify-app-template-node) を動かしてみるといくつか Cookie を使ってるようです。
気になったので、ここで使われてる Cookie が何に利用されるものなのか調査しました。

## `shopify_app_session`

アプリケーションのセッション情報を Cookie に保存する際の cookie の名前です。

Shopify App Node が [shopify-node-api](https://github.com/Shopify/shopify-node-api) を利用して OAuth プロセスで取得したアクセストークン等のセッション情報をSessionStorageに保存します。これは、 `/auth/callback` のエンドポイント内の [Shopify.Auth.validateAuthCallback](https://github.com/Shopify/shopify-app-template-node/blob/a572a919cf26b1e913fe176e6605191c5a8bd024/server/middleware/auth.js#L45-L49) で行われるため、この Cookie 名は Shopify App Node を検索してもヒットしません。

先程説明した通り、embedded app は 親 frame である Shopify Admin からもらったセッション情報（主に user id や shop の url など アクセストークン以外の情報）をJTW形式でもらいます。

JWT の user id, shop url と `Shopify_app_session` の cookie に紐づくアプリケーションのセッション情報をSessionStorageから取り出し、user id / shop url などが同じである場合、また有効期限内である場合、有効なセッションとして扱います。

## `shopify_top_level_oauth`

先程説明した `shopify_app_session` の セッション Cookie を保存するためには 1st party cookie にする必要があります。
つまり、embedded app のように iframe に埋め込まれるアプリケーションだったとしても、OAuth 認証をする場合はそのリクエストは iframe の外側 で行う必要があります。

`/auth/` で OAuth を始める際にそのリクエストが iframe の外側からなのか、それとも内側からなのか判定して、外側の場合にエラーを返すような実装をしたいところですが、HTTP リクエストからそのリクエスト元が `iframe の内側なのか` を判定することはできません。 Shopify App Node ではそれを Cookie の `sameSite` 属性をうまく利用して判定しています。

Shopify App Node の [server/middleware/auth.js](https://github.com/Shopify/shopify-app-template-node/blob/a572a919cf26b1e913fe176e6605191c5a8bd024/server/middleware/auth.js) が該当コードです。
以下、その処理の説明になります。

### `/auth` へのリクエストが iframe の外側からの場合

- STEP1：`/auth` にリクエスト
  - 最初は `shopify_top_level_oauth` の cookie が存在しないので `/auth/top-level` にリダイレクト
- STEP2：`/auth/top-level`
  - `shopify_top_level_oauth` の cookie を `samesite=strict` で発行
  - また、 JavaScript を返却し browser で実行
    - iframe の 外側なので（`window.top === window.self` で判定）`/auth` にリダイレクト
- STEP3：`/auth`
  - `/auth/top-level`  が iframe の外側で、そこから `/auth` へリダイレクトした場合、`/auth` で `shopify_top_level_oauth` の cookie が読めるので、認証処理を開始できる
  - つまり、iframe の外側にいることの確認が取れたことになる

### `/auth` へのリクエストが iframe の内側からの場合

- STEP1：`/auth` にリクエスト
  - 最初は `shopify_top_level_oauth` の cookie が存在しないので `/auth/top-level` にリダイレクト
- STEP2：`/auth/top-level`
  - `shopify_top_level_oauth` の cookie を `samesite=strict` で発行
  - また、 JavaScript を返却し browser で実行
    - iframe の 内側なので App Bridge のリダイレクト機能を利用して iframe の親 window で `/auth/top-level` にリダイレクト
    - `/auth` にリダイレクトしない理由は、iframe の内側からのリクエストに対して  `samesite=strict` で発行した cookie は ブラウザに保存されれないためです
- STEP3：`/auth/top-level`
  - iframe の 外側からのリクエストでまた同様に `shopify_top_level_oauth` の cookie を `samesite=strict` で発行
  - 以降は、`/auth へのリクエストが iframe の外側からの場合` と同じになる

以上のように、iframe の 内側か、外側かの判定はブラウザ側でして、その結果の判断は `samesite=strict` で発行された cookie の有無によって行われている。
