$(function(){
	//banner图
	$(".banner-btn").on("click",function(){
		var index = $(this).index();
		tabImg(index);
	});
	function tabImg(index){
		$(".banner-btn").eq(index).addClass("active").siblings().removeClass("active");
		$(".banner-items").eq(index).fadeIn().siblings().fadeOut();
		tIndex = index;
	};
	var len = $(".banner-btn").length;
	var tIndex = 0;
	var timer = null;
	autoPlay();
	function autoPlay(){
		timer = setInterval(function(){
			tIndex++;
			tIndex %=len;
			tabImg(tIndex);
		},3000);
	}
	//pc端事件在移动端无效
	$(".banner").hover(function(){
		clearInterval(timer);
	},function(){
		autoPlay();
	});
	//移动端事件，touchmove相当于onmousedown
//	$(".banner").on("touchstart",function(){
//		alert("touchstart");
//	});
	//移动端事件，touchend相当于onmouseup
//	$(".banner").on("touchend",function(){
//		alert("touchend");
//	});

	//置顶
	$(window).scroll(function(){
		var scrollTop = $(document).scrollTop() || $("html body").scrollTop();
		if(scrollTop > 500){
			$(".to-top").fadeIn();
		}else{
			$(".to-top").fadeOut();
		}
	});
	$(".to-top").on('click',function(){
		$("html body").stop(true).animate({"scrollTop":0});
	});
})