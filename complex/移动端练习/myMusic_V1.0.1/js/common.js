$(function(){
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