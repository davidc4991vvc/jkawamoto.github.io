---
title: "matplotlib で日本語を使う"
lastmod: 2013-06-30
date: "2013-03-13"
---
1. 日本語フォントのインストール
  * Takao Fonts を `Python\Lib\site-packages\matplotlib\mpl-data\fonts\ttf` へ．
2. 設定ファイルの編集
  * `Python\Lib\site-packages\matplotlib\mpl-data\matplotlibrc` を `~/.matplotlib/` にコピー
  * FONT セクションに下記を追加 (もちろん別のフォントを使う場合はそちらを指定)

```
font.serif : TakaoPMincho
font.sans-serif : TakaoPGothic
```

3. フォントキャッシュの削除
  * `~/.matplotlib/fontList.cache` を削除
