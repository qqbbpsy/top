var scrolltotop={
  setting: {startline:1300, scrollto: 0, scrollduration:1000, fadeduration:[500, 100]},
  controlHTML: &#39;&lt;img src=&quot;https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjn0b2ZSpC2xBj4zYvN-pNrwn5M-jXpi_48ZWmSy1Nfsph4unYAw2mx0TVmOp3uRCNpbP708x3jVCOJOMyyiLuwuMXQNc1nxr-A3m8358j7BaXXaP1hUg7ac1S4IgH_e0zm9YXA4Y8Kbk7verCer1I6FKUz4aSgEvxj6PbWFLWgVgZJK_sip4F2spvt/s1600/Alien_Point152x152.png&quot; /&gt;&#39;, // HTML for control, which is auto wrapped in DIV w/ ID=&quot;topcontrol&quot;
  controlattrs: {offsetx:5, offsety:5}, // offset of control relative to right/ bottom of window corner
  anchorkeyword: &#39;#top&#39;, // Enter href value of HTML anchors on the page that should also act as &quot;Scroll Up&quot; links
  state: {isvisible:false, shouldvisible:false},
  scrollup:function(){
    if (!this.cssfixedsupport) // if control is positioned using JavaScript
      this.$control.css({opacity:0}) // hide control immediately after clicking it
    var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto)
    if (typeof dest==&quot;string&quot; &amp;&amp; jQuery(&#39;#&#39;+dest).length==1) // check element set by string exists
      dest=jQuery(&#39;#&#39;+dest).offset().top
    else
      dest=0
    this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
  },
  keepfixed:function(){
    var $window=jQuery(window)
    var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx
    var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety
    this.$control.css({left:controlx+&#39;px&#39;, top:controly+&#39;px&#39;})
  },
  togglecontrol:function(){
    var scrolltop=jQuery(window).scrollTop()
    if (!this.cssfixedsupport)
      this.keepfixed()
    this.state.shouldvisible=(scrolltop&gt;=this.setting.startline)? true : false
    if (this.state.shouldvisible &amp;&amp; !this.state.isvisible){
      this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0])
      this.state.isvisible=true
    }
    else if (this.state.shouldvisible==false &amp;&amp; this.state.isvisible){
      this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1])
      this.state.isvisible=false
    }
  },
  init:function(){
    jQuery(document).ready(function($){
      var mainobj=scrolltotop
      var iebrws=document.all
      mainobj.cssfixedsupport=!iebrws || iebrws &amp;&amp; document.compatMode==&quot;CSS1Compat&quot; &amp;&amp; window.XMLHttpRequest // not IE or IE7+ browsers in standards mode
      mainobj.$body=(window.opera)? (document.compatMode==&quot;CSS1Compat&quot;? $(&#39;html&#39;) : $(&#39;body&#39;)) : $(&#39;html,body&#39;)
      mainobj.$control=$(&#39;&lt;div id=&quot;topcontrol&quot;&gt;&#39;+mainobj.controlHTML+&#39;&lt;/div&gt;&#39;)
          .css({position: mainobj.cssfixedsupport ? &#39;fixed&#39; : &#39;absolute&#39;, bottom: mainobj.controlattrs.offsety, right: mainobj.controlattrs.offsetx, opacity: 0, cursor: &#39;pointer&#39;,                   &#39;width&#39;: &#39;113px&#39;,
          &#39;height&#39;: &#39;auto&#39;
        })
        .attr({title:&#39;Scroll to Top&#39;})
        .click(function(){mainobj.scrollup(); return false})
        .appendTo(&#39;body&#39;)
      if (document.all &amp;&amp; !window.XMLHttpRequest &amp;&amp; mainobj.$control.text()!=&#39;&#39;) // loose check for IE6 and below, plus whether control contains any text
        mainobj.$control.css({width:mainobj.$control.width()}) // IE6- seems to require an explicit width on a DIV containing text
      mainobj.togglecontrol()
      $(&#39;a[href=&quot;&#39; + mainobj.anchorkeyword +&#39;&quot;]&#39;).click(function(){
        mainobj.scrollup()
        return false
      })
      $(window).bind(&#39;scroll resize&#39;, function(e){
        mainobj.togglecontrol()
      })
    })
  }
}
scrolltotop.init()