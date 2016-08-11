---
title: "Servlet で Velocity (1.6.4) を使う"
lastmod: 2013-06-30
date: "2010-10-05"
---
Servlet で Velocity を使用する場合，`org.apache.velocity.runtime.log.ServletLogChute` エラーが出ることがある．
これは，デフォルトログシステムの初期化に失敗しているからで，`ServletContext` を渡すか別のログシステムを使えば解決する．

ServletContext を渡す場合，次のようにすれば良い．

```java
VelocityEngine engine = new VelocityEngine();
engine.setApplicationAttribute(
    ServletContext.class.getName(), servletContext);
engine.init();
```

また，別のログシステムを使用する場合は，`runtime.log.logsystem.class` プロパティに設定する．

* 参考: [Apache](http://bit.ly/9vALBn)
