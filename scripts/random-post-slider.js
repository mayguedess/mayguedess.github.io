let limitSlider = 10;
$.ajax({
url: location.protocol + '//' + location.hostname +'/feeds/posts/default?orderby=published&alt=json-in-script&max-results=150',
dataType: 'jsonp',
success: function(json) {
let num = 0;
const key = {};
for(var i = 0;i<json.feed.entry.length;i++){
feeds = json.feed.entry[parseInt(Math.random() * json.feed.entry.length)];
if(key[feeds.id.$t] == null || key[feeds.id.$t] == ''){
if(num < limitSlider){
key[feeds.id.$t] = true;
const title = feeds.title.$t,
href = feeds.link[feeds.link.length - 1].href,
c = feeds.content.$t,
d=c.indexOf("<img"),
e=c.indexOf('src="',d),
f=c.indexOf('"',e+5),
g=c.substr(e+5,f-e-5),
imgs=-1!=d&&-1!=e&&-1!=f&&""!=g?g:"https://images.bizlaw.id/gbr_artikel/images-2_294.webp",
thumb = feeds.media$thumbnail != null ? feeds.media$thumbnail.url.replace(/s72-c/,'s500').replace(/s72-w400-h210-c/,'s500') : imgs;

$('#slides').append(`<div class="itemSlider"><div class="dataItem"><div><img loading="lazy" src="${thumb}"  ondragstart="event.preventDefault();"/><div class="num">${num += 1}</div></div><a href="${href}"><div class="ItemsTitle">${title}</div></a></div></div>`);
}
}}},
error: function() {$('#slides').html('<strong>Error Getting Data!</strong>');}
});

const scrollContainer = document.getElementById("slides"),
  matchAuto = document.getElementById("pxcSlide");
function slideShow() {
    var container = $('.itemSlider').width(),
      matchWidth = scrollContainer.scrollLeft,
      widthMax = scrollContainer.scrollWidth;
 document.getElementById('indicator').innerHTML = `matchWidth : ${matchWidth} // widthMax : ${widthMax} // container : ${$('.itemSlider').outerWidth()}`;
          document.getElementById('indicator2').innerHTML = `Total Matching If ${(matchWidth+container)+($('#pxcSlide').outerWidth()-container)} < ${widthMax} == ${(matchWidth+container)+($('#pxcSlide').outerWidth()-container)>=widthMax}`;
  if((matchWidth+container)+($('#pxcSlide').outerWidth()-container)>=widthMax){
    scrollContainer.scrollLeft += -widthMax;
  }else{
    scrollContainer.scrollLeft += container;
  }
}
var slide = setInterval(slideShow, 2000);

matchAuto.addEventListener("mouseover", function(){ clearInterval(slide)});
matchAuto.addEventListener("touchstart", function(){ clearInterval(slide)});

matchAuto.addEventListener("mouseout", function(){ slide = setInterval(slideShow, 2000);});
matchAuto.addEventListener("touchend", function(){ slide = setInterval(slideShow, 2000);});
document.getElementById('right-button').addEventListener('click', function(e) {
  e.preventDefault();
  var container = $('.itemSlider').width(),
      matchWidth = scrollContainer.scrollLeft,
      widthMax = scrollContainer.scrollWidth;
 document.getElementById('indicator').innerHTML = `matchWidth : ${matchWidth} // widthMax : ${widthMax} // container : ${container}`;
          document.getElementById('indicator2').innerHTML = `Total Matching If ${(matchWidth+container)+($('#pxcSlide').outerWidth()-container)} < ${widthMax} == ${(matchWidth+container)+($('#pxcSlide').outerWidth()-container)>=widthMax}`;
  if((matchWidth+container)+($('#pxcSlide').outerWidth()-container)>=widthMax){
    scrollContainer.scrollLeft += -widthMax;
  }else{
    scrollContainer.scrollLeft += container;
  }
  });
document.getElementById('left-button').addEventListener('click', function(e) {
  e.preventDefault();
  var container = $('.itemSlider').width(),
      matchWidth = scrollContainer.scrollLeft,
      widthMax = scrollContainer.scrollWidth;
  if(matchWidth==0){
    scrollContainer.scrollLeft += widthMax;
  }else{
    scrollContainer.scrollLeft += -container;
  }
  });
if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});
let isDown = false;
let startX;
let scrollLeft;
const slider = document.querySelector('.slides');
const end = (e) => {
	isDown = false;
  slider.classList.remove('active');
}

const start = (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;	
}

const move = (e) => {
	if(!isDown) return;
  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
  const dist = (x - startX);
  slider.scrollLeft = scrollLeft - dist;
}

(() => {
	slider.addEventListener('mousedown', start);
	slider.addEventListener('touchstart', start);
  
	slider.addEventListener('mousemove', move);
	slider.addEventListener('touchmove', move);

	slider.addEventListener('mouseleave', end);
	slider.addEventListener('mouseup', end);
	slider.addEventListener('touchend', end);
})();
}
