---
title: CookieのSameSite Attributeとは？ 
slug: what-is-samesite-cookie
lang: ja
image: https://i.gyazo.com/7a459884c162c29eec51aabd0aa4f61f.png
tags:
  - cookie
date: 2020-01-15
summary: 2020年2月のGoogle Chrome v80からCookieのSameSiteの初期値がLaxになります。ドメインをまたいで通信しCookieを利用しているサービスは影響あるかもしれません。SameSiteとはなんなのか、デモを通して説明していきます。
---


Cookie に SameSiteという新しい属性が追加されて、いくつかのブラウザではその初期値が変わる予定です。

Google Chrome ではその変更が2020年2月を予定しています。
複数のドメインの間で通信をし、Cookieを利用するサービスは影響あるかもしれません。

ここでは、 SameSite の概要と影響をさくっと確認していきます。

## SameSite Cookies とは？

SameSite とは、 Cookie に追加される新しい属性です。
Cookie を発行する際は、 key=value と合わせて、属性として Cookie の振る舞いを制御するオプションを設定できます。
例えば、

- Expires : Cookieの有効期限
- Secure : https の場合のみ利用を制限するかどうかのフラグ
- HttpOnly : サーバサイドでの利用に制限するかどうかのフラグ

などです。

SameSite は Cookie がドメインをまたいで利用されるときの挙動を制御する新しいオプションになります。
SameSite=Strict, SameSite=Lax, SameSite=None の3つの値から選択できます。
詳しい内容は後述します。

## SameSite Cookie が必要とされる理由

主な理由は、 CSRF（クロスサイトリクエストフォージェリー）という攻撃を防ぐことにあります。

例えば、SNSなどでコメントを投稿する機能を例に考えます。
コメントを投稿するのに必要な仕様は以下だとします。

- method : post
- URL : example.com/comments
- parameter : body (コメント内容)
- 条件 : ログイン必須（cookieを使って認証管理）
- 方法 : `<form>` タグを利用して送信

HTMLはこんな感じ。

```html
<!-- example.com でのコメント投稿機能 -->
<form method="POST" action="https://example.com/comments">
  <textarea placeholder="コメントを入力" name="body" rows="5" cols="33">
  <button>コメント送信</button>
</form>
```

もし、アクセスしたユーザーがログイン済みであれば、コメント投稿は成功します。
しかし、この実装のままだと、関係ないサービスからでもコメント投稿が成功してしまいます。
例えば、

```html
<!-- example.net （.netなので無関係のサイト）からの、example.com のコメント投稿機能を悪用したいたずら -->
<form style="display: none;" method="POST" action="https://example.com/comments">
  <textarea value="だれかの悪口。だれかの悪口。だれかの悪口。だれかの悪口。だれかの悪口。だれかの悪口。だれかの悪口。">
  <button>コメント送信</button>
</form>
```

このような実装で、ユーザーの意思とは関係なく、このformをsubmitすることで、そのログインユーザーのコメントとして投稿されてしまいます。
これがクロスサイトリクエストフォージェリーという攻撃です。

tokenを使ってリクエストが example.com からであるかどうかを確認する方法でこの攻撃を防ぐのが、よく見る対応です。
この攻撃は、別のサイトからの意図しないリクエストであっても cookie 込みで送信されるという cookie の仕様を利用（悪用）した方法とも言えます。

SameSite 属性を利用することで、 `関係ないサイト => example.com` へのリクエスト時に、cookie 込みで送信するかどうかを example.com 側で制御できるようになり、結果としてクロスサイトリクエストフォージェリー対策になります。

## SameSite の確認方法

Chrome DevToolsで確認可能です。
方法は2つあります。

### ネットワークタブ

Cookieが付与されているドメインのリクエストをネットワークタブで見つけ、詳細内の、 `Cookiesタブ` で確認可能です。

### アプリケーションタブ

アプリケーションタブの `Storage` > `Cookies` でドメイン毎に確認可能です。

## デモを使って確認

さっそく、 SameSite を指定した Cookie がどのようになるのかデモとともにみていきます。
ここでは、サイトA（背景色が白）とサイトB（背景色がグレー）の２つのサイトで、3つのリクエストを例に見ていきます

- サイトAからサイトBへの画面遷移
- サイトAでiframeを使って、サイトBを表示する際のリクエスト
- サイトAからサイトBへのXHR

サイトBには、 `test=test` という Cookieが付与されています。
サイトBを表示（リクエスト）する際、 `test=test` のCookieが読み取れれば画面に表示し、読み取れなければ、 `test=` と表示します。

Cookieを設定する際、 `SameSite` のオプションを変えて、上記3つのリクエストでCookieの読み取りにどんな違いがでるか見ていきます。

## デモ結果

サイトBでCookieの中身を読み取れるか？

sameSite|ページ遷移|iframe|XHR
---|---|---|---
strict|❌|❌|❌
Lax|⭕|❌|❌
None|⭕|⭕|⭕

https://samesite-cookie.web.app/

## SameSiteの利用パターン

認証管理に例して考えるなら、、、

### Cookieで認証管理しており、別ドメインからリクエストを行わないサービス

SameSiteを利用することで、クロスサイトリクエストフォージェリーの攻撃を防ぐことができるので、可能な限り、 `SameSite=Strict` や `SameSite=Lax` の利用をしていきたいとこです。

### Cookieで認証管理しており、別ドメインからリクエストを行うサービス

`SameSite=Strict` や `SameSite=Lax` を利用すると別ドメインからのリクエストでは、ログイン済みでも、Cookieが付与されて送信されないため、未ログインとして扱われてしまします。

また、Chrome, Firefox, Edgeでは SameSite が未指定の場合 `SameSite=Lax` として扱うことを検討しており、 Chrome version 80で 未指定の場合、 `SameSite=Lax` として扱い変更がリリースされる予定です。

よって、何も対応してないと、2020年2月の Chrome version 80 のリリースのタイミングでこのケースのサービスでは Chrome で `ログインできない` 不具合が発生します。
今まで同じ挙動にするためには、 `SameSite=None` と `Secure` のオプションを Cookie に設定する必要があります。

### 忘れがちなパターンの Chrome extension

別ドメインでリクエストが発生する忘れがちなパターンに Chrome extension があります。
もし Chrome extension を開発している場合は、 2020年2月の Chrome version 80 のリリースのタイミングでトラブルにならないように確認しておきましょう。

## SameSite未指定の場合、SameSite=Laxとして扱われることの確認方法

https://youtu.be/QSKky-bkTQ8?t=324


















