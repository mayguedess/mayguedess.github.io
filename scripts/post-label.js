const postLabel={
run:function(label,num,selector){
$.ajax({
    type:"GET",
    url:location.protocol + '//' + location.hostname +'/feeds/posts/default/-/'+label,
    data:{alt:"json","max-results":num},
    dataType:"jsonp",
    success:function(e){
    for(var i=0;i<e.feed.entry.length;i++){
    var feed = e.feed.entry[i],
     title = feed.title.$t;
    for(var o=0;o<feed.link.length;o++){
    var link = feed.link[o].href;
    }
    
    // Image Thumbnail
 var imgs,
  ca = feed.content != null ? feed.content.$t : feed.summary.$t,
  da=ca.indexOf("<img"),
  ea=ca.indexOf('src="',da) == '-1' ? ca.indexOf("src='",da) : ca.indexOf('src="',da),
  fa=ca.indexOf('"',ea+5) == '-1' ? ca.indexOf("'",ea+5) : ca.indexOf('"',ea+5),
  ga=ca.substr(ea+5,fa-ea-5);
  imgs=-1!=da&&-1!=ea&&-1!=fa&&""!=ga?ga:"https://i.imgur.com/NIDHEwU.png";
    var thumb = feed.media$thumbnail != null ? feed.media$thumbnail.url.replace(/s72-c/,'s500') : imgs;
    
var structure = '<div class="swiper-slide"><a href="'+ link +'"><img src="'+ thumb +'"/></a></div>';
$(selector).html(structure);
   }
     }});
}
};
