/*loading提示*/
//target：为某个目标元素(id为loading的元素)添加loading效果，mark（1~11）动画样式
function loading(target,mark){
	$(target).show().on("click",function(){
		$(this).hide();
	}).height(50);
	$.loading({target:$(target),mark:mark}); 
};

/*滚动事件封装*/
function loadScroll(callback,mark){
	window.onload = window.onscroll = function(){
		//可视区域
		var clientHeight = window.innerHeight || document.documentElement.clientHeight;
		//整个文档的高度
		var bheight = document.body.clientHeight;
		//滚动条的距离
		var stop = document.documentElement.scrollTop || document.body.scrollTop;
		// 当到达文档底部之前开始分页请求数据，并且只有当前次请求的数据加载完毕才进行下一次请求
		if(!window.loadMark && clientHeight+stop+3 >= bheight){
			//加锁，注意要在回调函数中让其变成false
			window.loadMark = true;
			loading("#loading",(mark||7));//mark没有传入，就用默认的动画
			callback && callback();	
		}
	};
};
//判断为空
function isEmpty(val) {
	val = $.trim(val);
	if (val == null)
		return true;
	if (val == undefined || val == 'undefined')
		return true;
	if (val == "")
		return true;
	if (val.length == 0)
		return true;
	if (!/[^(^\s*)|(\s*$)]/.test(val))
		return true;
	return false;
}
//范围随机数
function randomRange(start,end){
	return Math.floor(Math.random()*(end-start+1))+start;
};