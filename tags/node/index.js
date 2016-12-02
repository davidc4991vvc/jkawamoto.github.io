<!DOCTYPE HTML>
<html>
	<head prefix="og: http://ogp.me/ns#">
		<meta charset="utf-8" />
		<meta http-equiv="content-language" content="ja" />

		<title>Node.Js &middot; Junpei Kawamoto</title>
		<base href="https://www.jkawamoto.info/" />
		<meta name="generator" content="Hugo 0.18-DEV" />

		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="author" content="Junpei Kawamoto" />

		
		<meta name="description" content="Homepage of Junpei Kawamoto." />
		

		

		<meta property="og:type" content="article" />
		<meta property="og:title" content="Node.Js &middot; Junpei Kawamoto" />
		
		<meta name="og:description" content="Homepage of Junpei Kawamoto." />
		
		<meta property="og:image" content="https://www.jkawamoto.info/images/wordcloud.png" />
		<meta property="og:site_name"  content="Junpei Kawamoto" />

		
		<meta name="twitter:card" content="Homepage of Junpei Kawamoto." />
		
		<meta name="twitter:site" content="@junkawamoto" />

		
		
		<link rel="stylesheet" href="/css/main.css" />

		<link rel="preload" as="style" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" type="text/css" onload="this.rel='stylesheet'" />
    <link rel="preload" as="style" href="/css/custom.css" type="text/css" onload="this.rel='stylesheet'" />
		<noscript>
			<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" type="text/css" />
	    <link rel="stylesheet" href="/css/custom.css" type="text/css" />
		</noscript>

		<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<script>
		  (adsbygoogle = window.adsbygoogle || []).push({
		    google_ad_client: "ca-pub-4734862314145555",
		    enable_page_level_ads: true
		  });
		</script>
	</head>

	<body id="top">
		<div class="remodal-bg">
			<!-- Header -->
<header id="header">
	<a href="#" class="image avatar"><img src="/images/avatar.jpg" alt="" /></a>
	<h1 style="text-shadow: 1px 1px 5px black; color: rgba(255,255,255,0.7);"><strong>Junpei Kawamoto</strong>, Ph.D. in Informatics.<br>Research scientist working with data mining, security, and privacy.</h1>

  <br/>
  <ul style="list-style:none; text-shadow: 1px 1px 5px black; margin: 0em;">
    <li style="display: inline-block;"><a href="/#main">Home</a></li>
    
    <li style="display: inline-block;"><a href="/blogs/#main">Blog</a></li>
    
    <li style="display: inline-block;"><a href="/publications/#main">Publications</a></li>
    
    <li style="display: inline-block;"><a href="/research/#main">Research</a></li>
    
    <li style="display: inline-block;"><a href="/lectures/#main">Lectures</a></li>
    
  </ul>
	<ul style="list-style:none; text-shadow: 1px 1px 5px black;">
    
    <li style="display: inline-block;"><a href="/japanese/#main">日本語</a></li>
    
    <li style="display: inline-block;"><a href="/publications-ja/#main">論文リスト</a></li>
    
    <li style="display: inline-block;"><a href="/blog-ja/#main">メモ</a></li>
    
    <li style="display: inline-block;"><a href="/activity-ja/#main">その他の活動</a></li>
    
  </ul>

</header>


			<div id="main">
				<h1></h1>
	      
	        <section>
	          

<h2 id="summary">Summary</h2>

<p>Client-side package management tool has been replacing to <a href="https://www.npmjs.com/">npm</a> from <a href="http://bower.io/">bower</a>,
and client-side JavaScript packages are imported with <a href="http://browserify.org/">Browserify</a>.
However, it is difficult to import CSS files.
Supposing importing bootstrap&rsquo;s css installed with npm, which is installed by <code>npm i --save bootstrap</code>, to <code>bundle.css</code>,
this entry explains two importing ways;
<a href="https://github.com/rotundasoftware/parcelify">Parcelify</a> and <a href="https://github.com/reworkcss/rework">rework</a>.</p>

<p>We assume to use <a href="http://gulpjs.com/">Gulp</a> as the task runner,
and we investigate ways that don&rsquo;t fix directory structure.</p>

<h2 id="parcelify">Parcelify</h2>

<p><a href="https://github.com/rotundasoftware/parcelify">Parcelify</a> is a famous plugin of Browserify,
which means if your project doesn&rsquo;t use JavaScript, you need to add a dummy script file to use Parcelify.
To use Parcelify, you need to list up css files at <code>style</code> attribute in your <code>package.json</code>.</p>

<p>For example, the following <code>package.json</code> imports css files provided from Bootstrap.</p>

<pre><code class="language-json">{
  &quot;style&quot;: [
    &quot;./node_modules/bootstrap/dist/css/bootstrap.min.css&quot;,
    &quot;./src/css/main.css&quot;
  ]
}
</code></pre>

<p>Note that the above object omits other elements.</p>

<p>The following gulp task, then, bundles the css files listed in <code>style</code> attribute of your <code>package.json</code>
and makes <code>bundle.css</code>:</p>

<pre><code class="language-coffeescript">gulp = require &quot;gulp&quot;
browserify = require &quot;browserify&quot;
parcelify = require &quot;parcelify&quot;
source = require &quot;vinyl-source-stream&quot;

gulp.task &quot;browserify&quot;, -&gt;
  b = browserify
    entries: [&quot;./src/main.js&quot;]
    extensions: [&quot;.js&quot;]
  parcelify b,
    bundles:
      style: &quot;./public/bundle/bundle.css&quot;
  b.bundle()
    .pipe source &quot;bundle.js&quot;
    .pipe gulp.dest &quot;.public/bundle/&quot;
</code></pre>

<p>This way works but to list up all css files in the <code>style</code> attribute,
you need to know directory structures of all packages,
and such structures will be changed when packages are updated.
In other words, this way isn&rsquo;t sustainable.</p>

<h2 id="rework">rework</h2>

<p><a href="https://github.com/reworkcss/rework">rework</a> and a plugin of it <a href="https://github.com/reworkcss/rework-npm">rework-npm</a>
search all <code>package.json</code> of the packages you&rsquo;re using, and import css files those packages provide.
In other words, you don&rsquo;t need to list up css files in your <code>package.json</code>.</p>

<p><a href="https://github.com/sindresorhus/gulp-rework">gulp-rework</a> is a package to use rework from glup,
and we use it in this entry.</p>

<p>First, we need to make a parent css file describing which css files to be imported by rework.
For example, the following parent css file imports css files provided from Bootstrap.</p>

<pre><code class="language-css">@import &quot;bootstrap&quot;;

/* We omit other entries. */
</code></pre>

<p>We put the parent css file in <code>./src/</code>.</p>

<p>Next, we make the following gulp task,
which reads all css files in <code>./src/</code> and makes a bundled css file.</p>

<pre><code class="language-coffeescript">gulp = require &quot;gulp&quot;
rework = require &quot;gulp-rework&quot;
reworkNPM = require &quot;rework-npm&quot;

gulp.task &quot;css&quot;, -&gt;
  gulp.src &quot;./src/*.css&quot;
    .pipe rework(reworkNPM())
    .pipe gulp.dest &quot;./public/bundle/&quot;
</code></pre>

<p>Running css task, rework imports Bootstrap&rsquo;s css files and put them to the bundled file.</p>

<p>In this method, you don&rsquo;t need to check file structures of each package.
However, it, rework-npm, requires each package lists up its css file in its <code>package.json</code>,
which means you don&rsquo;t need to list up them but the authors of each package have to do that.</p>

<p>After listing up css files in style attribute becomes a standard, this method would work well,
but right now there are still packages which doesn&rsquo;t do that, and you have to do it instead.
The cost seems as same as one using Parcelify.</p>

	        </section>
	      
			</div>

			<!-- Footer -->
<footer id="footer">
	<ul class="icons">
		
		
    	<li><a href="//facebook.com/junpei.kawamoto" target="_blank" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
    
		
			<li><a href="//twitter.com/junkawamoto" target="_blank" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
		
		
			<li><a href="//github.com/jkawamoto" target="_blank" class="icon fa-github"><span class="label">Github</span></a></li>
		
		
			<li><a href="///www.linkedin.com/in/jkawamoto" target="_blank" class="icon fa-linkedin"><span class="label">LinkedIn</span></a></li>
		
		
		
			<li><a href="//www.youtube.com/channel/UCAImvZQSpr4dw6USxHNqDXg" target="_blank" class="icon fa-youtube"><span class="label">Youtube</span></a></li>
		
		
			<li><a href="//flickr.com/photos/junkawamoto" target="_blank" class="icon fa-flickr"><span class="label">Flickr</span></a></li>
		
		
			<li><a href="mailto:junpei.kawamoto@acm.org" class="icon fa-envelope-o"><span class="label">Email</span></a></li>
		
		
  		<li><a href="#" data-remodal-target="wallet" class="icon fa-btc"><span class="label">BTC</span></a></li>
		

	</ul>

	<ul class="copyright">
		
		<li>&copy; Junpei Kawamoto</li>
		
		<li>Design: <a href="//html5up.net">HTML5 UP</a></li>
		
		<li><a href="https://www.littlekitune.org/">Little Kitune studio</a></li>
		
	</ul>
</footer>
<!-- Scripts -->
<aside>
  <script src="/js/jquery.min.js"></script>
  <script src="/js/jquery.poptrox.min.js"></script>
  <script src="/js/skel.min.js"></script>
  <script src="/js/util.js"></script>
  
  <script src="/js/main.js"></script>

  
  <!-- Google Analytics -->
  <script>
    var _gaq=[['_setAccount','UA-19410992-1'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
  

  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/styles/agate.min.css" type="text/css" />
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
  <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-57f285f012d45509"></script>
</aside>


		</div>
		<div class="remodal" data-remodal-id="wallet">
  <button data-remodal-action="close" class="remodal-close"></button>
  <h1>Bitcoin wallet</h1>
  <p>
    My wallet address:
    <span>1625kBbXoGRWRh92XcgLFik5E6PgV482sm</span>
    <br/>
    <img src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=bitcoin:1625kBbXoGRWRh92XcgLFik5E6PgV482sm"/>
  </p>
  <br/>
  <button data-remodal-action="cancel" class="remodal-cancel">Close</button>
</div>
<link rel="stylesheet" href="css/remodal.css" type="text/css" />
<link rel="stylesheet" href="css/remodal-default-theme.css" type="text/css" />
<script src="js/remodal.min.js"></script>

	</body>
</html>
