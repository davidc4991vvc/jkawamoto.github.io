---
title: "WebCGIRoleでPHPを使う"
lastmod: 2013-06-30
date: "2011-02-10"
---
基本的な設定は，[ここ](http://codezine.jp/article/detail/5518)を参考にすれば良い．
しかし，Azure Cloud Tools 1.3 を使用している場合，*HTTP 500 Internal Server Error* が出ることがある．
この場合，`ServiceDefinition.csdef` の `<Sites>` 要素を削除する必要があるらしい．

```xml
<WebRole name="WebCgiRole1" enableNativeCodeExecution="true">
  <!--
  <Sites>
    <Site name="Web">
      <Bindings>
        <Binding name="Endpoint1" endpointName="Endpoint1" />
       </Bindings>
    </Site>
  </Sites>
  -->
  <Endpoints>
    <InputEndpoint name="Endpoint1" protocol="http" port="8080" />
  </Endpoints>
  <Imports>
    <Import moduleName="Diagnostics" />
   </Imports>
</WebRole>
```

参考: [Avkash Chauhan’s Blog](http://bit.ly/19w63DG)
