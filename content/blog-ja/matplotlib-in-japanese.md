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

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=jkwf4mew-22&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873117488&linkId=1c608fce49e114d898097d9ea9e403c7"></iframe>
