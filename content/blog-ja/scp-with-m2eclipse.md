---
title: "m2eclipse を使って scp でデプロイ"
lastmod: 2013-06-30
date: "2010-11-04"
---
Maven2 のプライベートリポジトリを作成し，
公開鍵認証を行う scp プロトコルを用いて eclipse の [m2eclipse プラグイン](http://m2eclipse.sonatype.org/]) からデプロイする設定のメモ．
なお，m2eclipse version 0.10.0 に含まれる **Maven 3.0-SNAPSHOT では scp 認証に失敗する**．
別途 Maven 2 系を (ダウンロード)[http://maven.apache.org/] して，eclipse のウインドウ → 設定 → Maven → インストールに追加しデフォルトに設定しておく必要がある．

準備が整えば，scp でアクセスする Maven リポジトリの作成から始める．作成するリポジトリの ID 及び，URL は次の通りとする．

* ID: foo.org
* リポジトリ URL: scp://foo.org/var/maven2/repo
* スナップショットリポジトリ URL: scp://foo.org/var/maven2/reposnap

つまり，/var/maven2/repo と /var/maven2/reposnap 以下にそれぞれのリポジトリ内容物を格納する．
そのため，リポジトリを利用するユーザに /var/maven2/repo と /var/maven2/reposnap への読み書き権限を与える．

scp プロトコルを使用するためには，wagon-ssh エクステンションが必要となるので，pom.xml の build – extendsions に以下を追加する．

```xml
<build>
  <extension>
    <groupId>org.apache.maven.wagon</groupId>
    <artifactId>wagon-ssh</artifactId>
    <version>1.0-beta-6</version>
  </extension>
</build>
```

次に，デプロイ先の情報を登録する．pom.xml の project に以下を追加．

```xml
<distributionManagement>
  <repository>
    <uniqueVersion>false</uniqueVersion>
    <id>foo.org</id>
    <name>Foo.org Repository</name>
    <url>scp://foo.org/var/maven2/repo</url>
    <layout>default</layout>
  </repository>
  <snapshotRepository>
    <uniqueVersion>true</uniqueVersion>
    <id>snapshot.foo.org</id>
    <name>Foo.org Snapshot repository</name>
    <url>scp://foo.org/var/maven2/reposnap</url>
    <layout>legacy</layout>
  </snapshotRepository>
</distributionManagement>
```

最後に，ssh のログイン情報を setting.xml に記述．なお，このファイルの場所は，eclipse のウインドウ → 設定 → Maven → User Settings に書いてあるが，デフォルトでは作成されない．もしなければ自分で作成し，下記の通り書き込めば良い．

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
          http://maven.apache.org/xsd/settings-1.0.0.xsd">
  <servers>
    <server>
      <id>foo.org</id>
      <username>USERNAME</username>
      <privateKey>PRIVATEKEY</privateKey>
      <filePermissions>664</filePermissions>
      <directoryPermissions>775</directoryPermissions>
    </server>
    <server>
      <id>snapshot.foo.org</id>
      <username>USERNAME</username>
      <privateKey>PRIVATEKEY</privateKey>
      <filePermissions>664</filePermissions>
      <directoryPermissions>775</directoryPermissions>
    </server>
  </servers>
</settings>
```

なお，USERNAME はログインユーザ名，PRIVATEKEY は秘密鍵 (openssl 形式) へのパスである．Putty 形式の秘密鍵ではエラーになるので注意．

以上で，実行 → 実行構成 → Maven Build にて新規実行構成を追加し，
pom.xml のあるディレクトリを基底ディレクトリに，
ゴールをdeployに，Mavenランタイムに3.0-SNAPSHOTではなく2系列を選択して実行すればデプロイされる．うまくいかない場合は， c:/Users/<user>/.ssh に known_hosts を作成し，

```xml
<file * known_hosts>foo.org ssh-rsa PUBLICKEY</file>
```

などと書く．PUBLICKEY は公開鍵，ssh-rsa の部分は鍵の種類によって変わる．公開鍵を調べるのが面倒な場合は TeraTerm の ssh_known_hosts ファイルなどからコピーすれば良い．

作成したプライベートリポジトリを使用する場合は，pom.xml の repositories に以下を追加する．

```xml
<repository>
  <id>foo.org</id>
  <name>Foo.org Repository</name>
  <url>scp://foo.org/var/maven2/repo</url>
  <layout>default</layout>
</repository>
<repository>
  <id>snapshot.foo.org</id>
  <name>Foo.org Snapshot repository</name>
  <url>scp://foo.org/var/maven2/reposnap</url>
  <layout>legacy</layout>
</repository>
```

これは，distributionManagement に記述した物とほぼ同じである．

## 参考：
* [scpを使ってデプロイする@Maven2のTipsを集めるWiki – CookBook](http://wiki.fdiary.net/maven2/?CookBook#l31)
* [構成管理 実践入門 第5章 Maven2ベストプラクティス 社内リポジトリ – 自分たちのライブラリ置き場](http://www.nulab.co.jp/kousei/chapter5/02.html)
