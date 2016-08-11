---
title: "mod_python と mod_filter でフィルタを登録する際の注意"
lastmod: 2013-06-30
date: "2010-11-16"
---
Apache 2.2 で mod_python と mod_filter を用いてフィルタを作成する際の注意というかバグ．
Python スクリプトをフィルタとして使う場合，まず，python 関数をフィルタプロバイダとして登録する．
そのために，[PythonOutputFilter ディレクティブ](http://www.python.jp/doc/contrib/modpython/dir-filter-of.html)を使用し，
書式は次の通りになる．

```
PythonOutputFilter module_name provider_name
```

なお，provider_name は mod_filter 側で参照する名前である．

mod_filter側の設定は，例えばコンテンツタイプに image が含まれるレスポンス用のフィルタを登録する場合，

```
FilterProvider filter_name provider_name resp=Content-Type $image
FilterChain filter_name
```

のようになり，先ほど provider_name として登録したフィルタプロバイダを適用条件を指定してフィルタに登録する．
二行目の FilterChain ディレクティブはフィルタの適用順序を指定している．

適用条件毎に異なるフィルタプロバイダを登録できることが mod_filter のポイントである．
例えば，次のようにすれば，画像フォーマット別に実行するスクリプトを切り替えることができる．

```
PythonOutputFilter png PNG_COMPRESSOR
PythonOutputFilter jpg JPG_COMPRESSOR

FilterProvider image_compressor PNG_COMPRESSOR resp=Content-Type image/png
FilterProvider image_compressor JPG_COMPRESSOR resp=Content-Type image/jpeg
FilterChain image_compressor
```

この場合，PNG には png.outputfilter 関数が，JPEG には jpg.outputfilter 関数が呼ばれる．

前置きが長くなったが，実際には上のようなフィルタを作成することができなかった．
そもそも，provider_name と filter_name が異なってると，

```
python_filter: Could not find registered filter.
```

などと言われてしまう．
結局，一つのフィルタプロバイダごとに一つのフィルタを作成せねばならず，冗長な設定が増えるばかりである．

なお，[mod_ext_filter](http://httpd.apache.org/docs/2.2/mod/mod_ext_filter.html)にて登録したフィルタを
mod_filter と組み合わせて使用する場合も provider_name と filter_name が同じでなければならない．
mod_filter のどこかで， provider_name と filter_name を取り違えてるんじゃないかと思われるがソースコードは読んでないので不明．
