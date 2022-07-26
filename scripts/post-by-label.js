  <script>
  
const postLabel={
run:function(label,num){
$.ajax({
url: location.protocol + '//' + location.hostname + '/feeds/posts/default/-/'+label,
type: 'get',
data:{orderby: "updated", alt:"json","max-results":num},
dataType: 'jsonp',
success: function(json) {
let num = 0;
for(var i = 0;i<limitSlider;i++){
feeds = json.feed.entry[i];
const title = feeds.title.$t,
href = feeds.link[feeds.link.length - 1].href,
c = feeds.content.$t,
d=c.indexOf("<img"),
e=c.indexOf('src="',d),
f=c.indexOf('"',e+5),
g=c.substr(e+5,f-e-5),
imgs=-1!=d&&-1!=e&&-1!=f&&""!=g?g:"https://images.bizlaw.id/gbr_artikel/images-2_294.webp",
thumb = feeds.media$thumbnail != null ? feeds.media$thumbnail.url.replace(/s72-c/,'s500').replace(/s72-w400-h210-c/,'s500') : imgs;

$('#swiper-wrapper').append(`<div class="swiper-slide"><a href="${href}"><img loading="lazy" src="${thumb}" ondragstart="event.preventDefault()"></a></div>`);
}},
error: function() {$('#swiper-wrapper').html('<strong>Error Getting Data!</strong>');}
})
}
};        
</script>
