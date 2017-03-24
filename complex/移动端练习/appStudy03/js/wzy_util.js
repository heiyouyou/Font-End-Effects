/*loading提示*/
function loading(target,mark){
	$(target).show().on("click",function(){
		$(this).hide();
	}).height(50);
	$.loading({target:$(target),mark:mark}); 
};

/*滚动事件封装*/
//target：为某个目标元素添加loading效果，mark（1~11）动画样式
function loadScroll(callback){
	window.onload = window.onscroll = function(){
		//可视区域
		var clientHeight = window.innerHeight || document.documentElement.clientHeight;
		//整个文档的高度
		var bheight = document.body.clientHeight;
		//滚动条的距离
		var stop = document.documentElement.scrollTop || document.body.scrollTop;
		// 当到达文档底部之前开始分页请求数据，并且只有当前次请求的数据加载完毕才进行下一次请求
		if(!window.loadMark && clientHeight+stop+3 >= bheight){
			//加锁
			window.loadMark = true;
			//执行一个异步操作,跨域的问题,需要消耗时间
			loading("#loading",2);
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
};

/*
ajax({
	url:请求的地址,//必须
	type:请求的类型,//非必须
	async:是否异步,//非必须
	data:请求的参数,//非必须，
	支持key1=value1&key2=value3...这种表单数据格式或者{k1:v1,k2:v3,...}对象格式
	//请求成功的回调函数
	callback:function(data){

	}
})*/
function ajax(options){
	var xml = null;
	//默认参数
	var default = {
		type:"post",
		async:true
	};
	// 合并参数
	for(var key in default){
		if(!options[key]){
			options[key] = default[key];
		};
	}
	// 获取指定格式的参数列表
	if(options.data){
		options.data = format(options.data);
	};
	// 兼容IE678
	if(window.ActiveXObject){
		xml = new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		xml = new XMLHttpRequest();
	};
	// 判断是为get请求还是post请求
	if(options.type.tolowerCase() == "get"){
		// 判断是否有请求参数
		options.data ? xml.open(options.type,options.url+"?"+options.data,true):xml.open(options.type,options.url,options.async);
		xml.send();
	}else{
		xml.open(options.type,options.url,options.async);
		//post提交数据的时候一定要设置这行代码
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8'");
		options.data ? xml.send(options.data):xml.send();
	}
	// 监听成功请求连接服务器响应的状态
	xml.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			options.callback && options.callback(this.responseText);
		}
	};
	// 格式化参数
	function formatParams(params){
		var par = [];
		// 判断是否是json对象
		if((typeof params).toLowerCase() == "object"){
			params = JSON.stringify(params);
		}else{
			// 不是json格式的数据，直接返回出去
			return params;
		};
		// 如果是json格式的数据，进行转换
		if(params.indexOf("&") == -1){
			var json = JSON.parse(params);
			for(var key in json){
				// encodeURIComponent()处理特殊字符
				par.push(key.encodeURIComponent()+"="+json[key].encodeURIComponent());
			}
			// 格式化成k1=v1&k2=v2...字符串格式
			return par.join("&");
		};
	}
}