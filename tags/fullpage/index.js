<!DOCTYPE HTML>
<html>
	<head prefix="og: http://ogp.me/ns#">
		<meta charset="utf-8" />
		<meta http-equiv="content-language" content="ja" />

		<title>Fullpage.Js &middot; Junpei Kawamoto</title>
		<base href="https://www.jkawamoto.info/" />
		<meta name="generator" content="Hugo 0.18-DEV" />

		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="author" content="Junpei Kawamoto" />

		
		<meta name="description" content="Homepage of Junpei Kawamoto." />
		

		

		<meta property="og:type" content="article" />
		<meta property="og:title" content="Fullpage.Js &middot; Junpei Kawamoto" />
		
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

<p><a href="https://github.com/hellsan631/angular-fullpage.js">angular-fullpage.js</a> is a library
to use <a href="http://alvarotrigo.com/fullPage/">fullPage.js</a> in <a href="http://angularjs.org/">AngularJS</a>,
but the <a href="https://www.npmjs.com/package/angular-fullpage.js">npm</a> version has a problem in event handling,
and you need to use GitHub version.</p>

<p>Although fullPage.js also assumes every section is a child of a same parent node, it is difficult in AngularJS.
I <a href="https://github.com/jkawamoto/fullPage.js">modified fullPage.js</a> to solve this problem.</p>

<p>This entry explains how to use my fullPage.js in AngularJS.</p>

<h2 id="angular-fullpage-js">angular-fullpage.js</h2>

<p>The current version of angular-fullpage.js in npm has a problem in event handling,
and you need to use the newest source code from GitHub.
<code>dependencies</code> in <code>package.json</code> allows GitHub repositores, i.e.</p>

<pre><code class="language-json">{
  &quot;dependencies&quot;: {
    &quot;angular-fullpage.js&quot;: &quot;hellsan631/angular-fullpage.js&quot;,
    ...
  },
  ...
}
</code></pre>

<p>and <code>npm install</code> downloads the newest source code from GitHub.</p>

<p>To activate fullPage.js, you need to add <code>full-page</code> attribute to the parent node</p>

<pre><code class="language-html">&lt;div full-page&gt;
  &lt;div class=&quot;section&quot;&gt;Section 1&lt;/div&gt;
  &lt;div class=&quot;section&quot;&gt;Section 2&lt;/div&gt;
  &lt;div class=&quot;section&quot;&gt;Section 3&lt;/div&gt;
  …
&lt;/div&gt;
</code></pre>

<p>and give options through <code>options</code> attribute.
For example, make a controller</p>

<pre><code class="language-js">class FullpageCtrl {

  constructor() {

    this.options = {
      sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE'],
      scrollingSpeed: 1000,
      onLeave: (index, nextIndex, direction) =&gt; {
        // do something
      }
    };

  }

}
</code></pre>

<p>and use it from a template</p>

<pre><code class="language-html">&lt;div full-page options=&quot;$ctrl.options&quot;&gt;
  &lt;div class=&quot;section&quot;&gt;Section 1&lt;/div&gt;
  &lt;div class=&quot;section&quot;&gt;Section 2&lt;/div&gt;
  &lt;div class=&quot;section&quot;&gt;Section 3&lt;/div&gt;
  ...
&lt;/div&gt;
</code></pre>

<h2 id="apply-fullpage-js-for-not-sibling-nodes">Apply fullPage.js for not sibling nodes</h2>

<p>fullpage.js assumes every section is a child of a same parent node, for example</p>

<pre><code class="language-html">&lt;div full-page&gt;
  &lt;div class=&quot;section&quot;&gt;Section 1&lt;/div&gt;
  &lt;div class=&quot;section&quot;&gt;Section 2&lt;/div&gt;
  &lt;div class=&quot;section&quot;&gt;Section 3&lt;/div&gt;
  ...
&lt;/div&gt;
</code></pre>

<p>This constraint might be a problem when you combine components providing sections.
Suppose two components <code>component1</code> and <code>component2</code>, and those templates are</p>

<pre><code class="language-html">&lt;div class=&quot;section&quot; ng-repeat=&quot;item in $ctrl.items&quot;&gt;
  &lt;!-- some contents --&gt;
&lt;/div&gt;
</code></pre>

<pre><code class="language-html">&lt;div class=&quot;section&quot; ng-repeat=&quot;item in $ctrl.items&quot;&gt;
  &lt;!-- some contents --&gt;
&lt;/div&gt;
</code></pre>

<p>In this case, a parent node of fullpage.js is</p>

<pre><code class="language-html">&lt;div full-page&gt;
  &lt;component1&gt;&lt;/component1&gt;
  &lt;component2&gt;&lt;/component2&gt;
&lt;/div&gt;
</code></pre>

<p>This template is extended to</p>

<pre><code class="language-html">&lt;div full-page&gt;
  &lt;component1&gt;
    &lt;div class=&quot;section&quot;&gt;
     &lt;!-- some contents --&gt;
    &lt;/div&gt;
    &lt;div class=&quot;section&quot;&gt;
     &lt;!-- some contents --&gt;
    &lt;/div&gt;
    ...
  &lt;/component1&gt;
  &lt;component2&gt;
    &lt;div class=&quot;section&quot;&gt;
      &lt;!-- some contents --&gt;
    &lt;/div&gt;
    &lt;div class=&quot;section&quot;&gt;
      &lt;!-- some contents --&gt;
    &lt;/div&gt;
    ...
  &lt;/component2&gt;
&lt;/div&gt;
</code></pre>

<p>and those sections are not children of a same parent node,
which means fullPage.js doesn&rsquo;t work in such case.</p>

<p>I fixed this problem and my source code is available in <a href="https://github.com/jkawamoto/fullPage.js">GitHub</a>.
To use my version, your <code>package.json</code> should have a link to my repository like</p>

<pre><code class="language-json">{
  &quot;dependencies&quot;: {
    &quot;fullpage.js&quot;: &quot;jkawamoto/fullPage.js#deeper-section-spike&quot;,
    ...
  },
  ...
}
</code></pre>

<p>This version searches all nodes to find sections and it might be slower than original version.</p>

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
