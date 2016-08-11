---
title: "pdfoutput が定義されていない問題"
lastmod: 2013-06-30
date: "2013-03-01"
---
[某 LaTeX スタイルファイル](http://www.vldb.org/pvldb/format.html)を使ったとき，
`pdfoutput` が定義されていないと言われてコンパイルが通らない．
とりあえず，

```
\def\pdfoutput{0}
```

と書いておけば，エラーは消える．
本当は別のパッケージやオプションで設定すべきだとは思うが・・・．
