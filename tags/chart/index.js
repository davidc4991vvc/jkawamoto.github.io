<!DOCTYPE HTML>
<html>
	<head prefix="og: http://ogp.me/ns#">
		<meta charset="utf-8" />
		<meta http-equiv="content-language" content="ja" />

		<title>Chart.Js &middot; Junpei Kawamoto</title>
		<base href="https://www.jkawamoto.info/" />
		<meta name="generator" content="Hugo 0.18-DEV" />

		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="author" content="Junpei Kawamoto" />

		
		<meta name="description" content="Homepage of Junpei Kawamoto." />
		

		

		<meta property="og:type" content="article" />
		<meta property="og:title" content="Chart.Js &middot; Junpei Kawamoto" />
		
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
	          

<h2 id="angular-chart">Angular Chart</h2>

<p>This entry explains how to use <a href="http://www.chartjs.org/">Chart.js</a> in <a href="http://angularjs.org/">AngularJS</a>.
The answer is simple and use <a href="http://jtblin.github.io/angular-chart.js/">Angular Chart</a>.</p>

<p>To add a chart in your application, you need to add a <code>canvas</code> element with <code>chart</code> class and a class depended on chart type you want to add.
Suppose we are adding a bar chart in an application, for example, we need to add a <code>canvas</code> element with <code>class=&quot;chart chart-bar&quot;</code>.</p>

<p>In Angular Chart, data to be plotted are given through <code>chart-data</code>, <code>chart-labels</code>, <code>chart-series</code>, and <code>chart-dataset-override</code> elements.
This design is little bit different from one of original <a href="http://www.chartjs.org/">Chart.js</a>.</p>

<p><code>chart-data</code> attribute is associated with <code>data.datasets</code> in <code>Chart.js</code>, but it only takes a list or 2-dimensions list,
although <code>data.datasets</code> takes a more complex object, including labels, color information, etc.
Here is an example object in <code>Chart.js</code>:</p>

<pre><code class="language-js">datasets: [{
  label: '# of Votes',
  data: [12, 19, 3, 5, 2, 3],
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ],
  borderColor: [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ],
  borderWidth: 1
},
...
]
</code></pre>

<p>In Angular Chart, the data given to <code>chart-data</code> attribute must consist of only data attribute in the above object,
i.e. the constructor of our controller is</p>

<pre><code class="language-js">class GraphCtrl{
  constructor() {
    this.data = [
      [12, 19, 3, 5, 2, 3],
      ...
    ];
  }
}
</code></pre>

<p>and our template is <code>&lt;canvas class=&quot;chart chart-bar&quot; chart-data=&quot;$ctrl.data&quot; /&gt;</code>.</p>

<p>Label information is given through <code>chart-series</code> attribute,
and the attribute takes a list consists of label names.</p>

<p>The other information such as <code>backgroundColor</code>, <code>borderColor</code>, <code>borderWidth</code>, etc. is given through <code>chart-dataset-override</code> attribute.
This attribute takes as same object as one in <code>Chart.js</code> without <code>data</code> and <code>label</code> attributes.</p>

<p>Note that, <code>chart-data</code> attribute is required and you shouldn&rsquo;t give data through <code>chart-dataset-override</code> attaribute.</p>

<h3 id="example">Example</h3>

<p>In this example, we&rsquo;ll convert <a href="(http://www.chartjs.org/docs/#getting-started-creating-a-chart)">a bar chart example</a> given
in Chart.js&rsquo;s document for Angular Chart.</p>

<h4 id="chart-js-version">Chart.js version</h4>

<pre><code class="language-js">var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [&quot;Red&quot;, &quot;Blue&quot;, &quot;Yellow&quot;, &quot;Green&quot;, &quot;Purple&quot;, &quot;Orange&quot;],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
</code></pre>

<h4 id="angular-chart-version">Angular Chart version</h4>

<p><strong>chart.js</strong></p>

<pre><code class="language-js">class ChartCtrl{

  constructor(){

    this.labels = [&quot;Red&quot;, &quot;Blue&quot;, &quot;Yellow&quot;, &quot;Green&quot;, &quot;Purple&quot;, &quot;Orange&quot;];
    this.data = [
      [12, 19, 3, 5, 2, 3]
    ];
    this.seriese = [&quot;# of Votes&quot;];
    this.datasets = [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ];
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

  }

}
</code></pre>

<p><strong>chart.html</strong></p>

<pre><code class="language-html">&lt;canvas class=&quot;chart chart-bar&quot;
  chart-data=&quot;$ctrl.data&quot;
  chart-labels=&quot;$ctrl.labels&quot;
  chart-series=&quot;$ctrl.seriese&quot;
  chart-dataset-override=&quot;$ctrl.datasets&quot;
  chart-options=&quot;$ctrl.options&quot;
/&gt;
</code></pre>

<p>If <code>datasets</code> has only one sequence as the above example, <code>data</code> and <code>datasets</code> shouldn&rsquo;t be lists.
But, in this case, <code>chart-series</code> attribute will be ignored,
and don&rsquo;t forget to add <code>label: &quot;# of Votes&quot;</code> attribute.</p>

<pre><code class="language-js">this.data = [12, 19, 3, 5, 2, 3];
this.datasets = {
  label: &quot;# of Votes&quot;,
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ],
  borderColor: [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ],
  borderWidth: 1
};
</code></pre>

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
