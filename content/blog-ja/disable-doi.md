---
title: "某 BibTeX スタイルで DOI を非表示にする"
lastmod: 2015-12-23
date: "2013-04-16"
---
DOI を参考文献リストに載せたくない場合，bstファイルの以下の部分

```
FUNCTION {format.doi.url}
{ doi empty$
    { url empty$
     'skip$
     { format.online output.nonnull
       format.url
     }
     if$
    }
    { format.online output.nonnull
      "\doi{" doi "}" * *
    }
  if$
}
```

を

~~~
FUNCTION {format.doi.url}{}
~~~

としておけば良い．
