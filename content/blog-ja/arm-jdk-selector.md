---
title: "Arm 用 OpenJDK で Selector#select の挙動がおかしい"
lastmod: 2013-06-30
date: "2010-09-22"
slug: arm-jdk-selector
---
ARM 用の OpenJDK VM (OpenJDK Core VM) では，
選択できるキーが有ろうが無かろうが一つのキーも選択せずに Selector#select() が即座に返る．
そして CPU 使用率がどんどん上がっていく．

```java
final Selector sel = Selector.open();
final ServerSocketChannel s = ServerSocketChannel.open();
s.configureBlocking(false);
s.socket().bind(address);
s.register(sel, SelectionKey.OP_ACCEPT);
while(true){
  // nc は常に 0
  final int nc = sel.select();

  for(final SelectionKey key : sel.selectedKeys()){
      if(key.isAcceptable()){
      // 適当に accept する
      ((ServerSocketChannel)key.channel()).accept();
    }
  }
}
```

選択できるキーが無い場合はともかく，実際に繋ぎに来ている場合でも無視されるので使い物にならない．
なお，別の VM (OpenJDK Zero VM) に切り替えたところ正常に動いた．
