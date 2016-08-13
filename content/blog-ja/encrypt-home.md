---
title: "ホームディレクトリを暗号化すると公開鍵認証でログインできない"
lastmod: 2013-06-27
date: "2010-11-03"
---
Ubuntu 10.04 (lucid)で，深く考えずにホームディレクトリを暗号化してしまった結果，
ssh の公開鍵認証ログインができなくなった．
というか，ローカルコンソールでログイン済みの時は問題なく ssh でもログインできるが，
ローカルでログインしていないと認証に失敗するようになった．
よく考えれば，ホームディレクトリに置いている公開鍵を sshd が読めないので認証に失敗するのは当然である．

[bear.mini : Ubuntu 9.10 (Karmic Koala) でホームディレクトリを暗号化すると、ssh で公開鍵認証ログインが出来ない問題（解決）](http://bearmini.net/blog/View.aspx?bid=1&aid=173)
や
[MacBookの憂鬱日記 : sshの設定 その２　っていうか、追記](http://fukafuka.naganoblog.jp/e326208.html)
を参考に，次のようにして解決．

まず，暗号化されていないディレクトリに公開鍵を配置（今回は，`/home/.ecryptfs/USERNAME/.ssh/authorized_keys` を選んだ）
そして，鍵置き場と公開鍵のパーミション設定（`/home/.ecryptfs/<username>/.ssh` は 700, `authorized_keys` は 600）．
最後に，sshd_config の編集．具体的には，AuthorizedKeysFile の部分を次のように変更．

```sshd_config
AuthorizedKeysFile      /home/.ecryptfs/%u/.ssh/authorized_keys
```
