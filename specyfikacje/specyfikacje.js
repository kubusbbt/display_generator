var specyfikacje = {
	
	'gdn': {
		'href_start': '<a style="cursor:pointer" onclick="window.open(window.clickTag, \'_blank \');void(0);">',
		'href_stop': '</a>',
		'top_script': '',
		'head_script': '',
		'footer_script': '',
		'manifets': false
	},


	// taka sama co gdn
	'bankier': {
		'href_start': '<a style="cursor:pointer" onclick="window.open(window.clickTag, \'_blank \');void(0);">',
		'href_stop': '</a>',
		'top_script': '',
		'head_script': '',
		'footer_script': '',
		'manifets': false
	},


	'standard': {
		'href_start': '<a style="text-decoration:none" href="" id="clickTag">',
		'href_stop': '</a>',
		'top_script': '',
		'head_script': `
			<link type="text/css" rel="stylesheet" href="http://static.clickonometrics.pl/html5.css" />
			<script type="text/javascript" src="http://static.clickonometrics.pl/clickTag.js"></script>
			<script>
				var CCM_clickTag = CCM_getClickTag({ //method CCM_getClickTag() returns CCM_clickTag
					clickTarget: 'clickTag', //change to link id which href will be replaced automatically with clickTag
				});
			</script>
		`,
		'footer_script': '',
		'manifest': 'standard',
	},


	'interia': {
		'href_start': `<div style="cursor:pointer;text-decoration:none;" id="clickTag" onclick="dharmapi.click(param ='clickTag', url ='')">`,
		'href_stop': '</div>',
		'top_script': '',
		'head_script': '',
		'footer_script': '',
		'manifest': 'interia'
	},


	'onet': {
		'href_start': `<div style="cursor:pointer" onclick="window.open(window.clickTag, '_blank');">`,
		'href_stop': '</div>',
		'top_script': `
			<script>
				var params = {};
				window.location.href.replace(/[?#&]+([^=&]+)=([^&]*)/gi,
				function(m,key,value) { params[key] =
				decodeURIComponent(value);});
				var clickTag = (params['click'] === undefined) ?
				'http://onet.pl' : params['click'];
			</script>
		`,
		'head_script': '',
		'footer_script': '',
		'manifest': false,
	},


	'wp': {
		'href_start': `<div style="cursor:pointer" onclick="window.open(window.clickTag, '_blank')">`,
		'href_stop': '</div>',
		'top_script': '',
		'head_script': '',
		'footer_script': '',
		'manifest': false,
	},


	'novem': {
		'href_start': `<div style="text-decoration:none" onclick="hcb('exit', 'clickTag');">`,
		'href_stop': '</div>',
		'top_script': `
			<script type="text/javascript">
			(function(h,a,c,b,n,v,m){h['Hacb']=n;h[n]=h[n]||function(){
			(h[n].q=h[n].q||[]).push(arguments)},
			v=a.createElement(c);m=a.getElementsByTagName(c)[0];
			v.async=1;v.src=b;m.parentNode.insertBefore(v,m);
			})(window,document,'script','https://adseu.novem.pl/html5/api/hacb.min.js','hcb');
			hcb('init');
			</script>
		`,
		'head_script': '',
		'footer_script': '',
		'manifest': 'novem',
	},


	'adform': {
		'href_start': '<div style="cursor:pointer" class="click-layer" id="clickLayer">',
		'href_stop': '</div>',
		'top_script': '',
		'head_script': `
			<script>
				document.write('<script src="'+ (window.API_URL || 'https://s1.adform.net/banners/scripts/rmb/Adform.DHTML.js?bv='+ Math.random()) +'"></script>');
			</script>
		`,
		'footer_script': `
			<script>
				var clickArea = document.getElementById('clickLayer');

				clickTAGvalue = dhtml.getVar('clickTAG', 'http://www.example.com');
				landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');

				clickArea.onclick = function() {
					window.open(clickTAGvalue,landingpagetarget);
				}
			</script>
		`,
		'manifest': 'adform',
	},

};

exports.specyfikacje = specyfikacje;
