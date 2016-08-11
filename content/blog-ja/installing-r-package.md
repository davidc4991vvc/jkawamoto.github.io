---
title: "R でのパッケージインストール"
lastmod: 2013-06-30
date: "2013-06-12"
---
もっと良い方法があるのかも知れないが・・・．
ChangeAnomalyDetection パッケージをインストールする場合，ルートで R を起動し

```
install.packages("ChangeAnomalyDetection")
```

を実行する．
依存パッケージがあるとエラーが出るので，
そのエラーで必要と言われたパッケージを同様の方法でインストールしてから再度インストールする．
