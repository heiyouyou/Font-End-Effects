//不可删除此代码，此代码作为所有业务逻辑代码的全局对象
var global = {
	wzy:{}//根据每个人的合作而定各自业务逻辑的对象
}
$(function(){
	//置顶
	global.wzy.toTop = function(){
		$(window).scroll(function(){
			var scrollTop = global.wzy.getScrollTop();
			if(scrollTop > 500){
				$(".to-top").fadeIn();
			}else{
				$(".to-top").fadeOut();
			}
		});
		$(".to-top").on('click',function(){
			$("html body").stop(true).animate({"scrollTop":0});
		});
	};
	global.wzy.toTop();
	
	//获取滚动的距离
	global.wzy.getScrollTop = function(){
		return $(document).scrollTop() || $("html body").scrollTop();	
	}
});