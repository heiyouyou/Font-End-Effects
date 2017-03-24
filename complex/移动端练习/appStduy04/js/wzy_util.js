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
	success:function(data){

	}
})*/
function ajax(options){
	var xml = null;
	//默认参数
	var defaultOpt = {
		type:"get",
		async:true
	};
	// 合并参数
	for(var key in defaultOpt){
		if(!options[key] && ((typeof options[key])!= "boolean")){
			options[key] = defaultOpt[key];
		};
	}
	// 获取指定格式的参数列表
	if(options.data){
		options.data = formatParams(options.data);
	};
	// 兼容IE678
	if(window.ActiveXObject){
		xml = new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		xml = new XMLHttpRequest();
	};
	// 判断是为get请求还是post请求
	if(options.type.toLowerCase() == "get"){
		// 判断是否有请求参数
		options.data ? xml.open(options.type,options.url+"?"+options.data,true):xml.open(options.type,options.url,options.async);
		xml.send();
	}else{
		xml.open(options.type,options.url,options.async);
		//post提交数据的时候一定要设置这行代码
		xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8'");
		options.data ? xml.send(options.data):xml.send();
	}
	// 监听成功请求连接服务器响应的状态
	xml.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			options.success && options.success(this.responseText);
		}
	};
}
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
			par.push(encodeURIComponent(key)+"="+encodeURIComponent(json[key]));
		}
		// 格式化成k1=v1&k2=v2...字符串格式
		return par.join("&");
	};
}

//封装ajax，参数为一个对象
//function ajax(obj) {
//	var xhr = createXHR();//创建XHR对象
//	//通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
//	obj.url = obj.url + '?rand=' + Math.random();
//	obj.data = params(obj.data);//通过params()将名值对转换成字符串
//	//若是GET请求，则将数据加到url后面
//	if (obj.method === 'get') {
//		obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&'+obj.data; 
//	}
//	if(obj.async === true) {//true表示异步，false表示同步
//		//使用异步调用的时候，需要触发readystatechange 事件
//		xhr.onreadystatechange = function () {
//			if (xhr.readyState == 4) {//判断对象的状态是否交互完成
//				callback();//回调
//			}
//		};
//	}
//	//在使用XHR对象时，必须先调用open()方法，
//	//它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
//	xhr.open(obj.method, obj.url, obj.async);
//	if (obj.method === 'post') {
//		//post方式需要自己设置http的请求头，来模仿表单提交。
//		//放在open方法之后，send方法之前。
//		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//		xhr.send(obj.data);	//post方式将数据放在send()方法里
//	} else {
//		xhr.send(null);	//get方式则填null
//	}
//	if (obj.async === false) {  //同步
//		callback();
//	}
//	function callback() {
//		if (xhr.status == 200) {//判断http的交互是否成功，200表示成功
//			obj.success(xhr.responseText);//回调传递参数
//		} else {
//			console.log('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
//		}	
//	}
//}
////名值对转换为字符串
//function params(data) {
//	var arr = [];
//	for (var i in data) {
//		//特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
//		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
//	}
//	return arr.join('&');
//}
//function createXHR() {
//	if (window.XMLHttpRequest) {//IE7+、Firefox、Opera、Chrome 和Safari
//		 return new XMLHttpRequest();
//	} else if (window.ActiveXObject) {//IE6 及以下
//		var versions = ['MSXML2.XMLHttp','Microsoft.XMLHTTP'];
//		for (var i = 0,len = versions.length; i<len; i++) {
//			try {
//				return new ActiveXObject(version[i]);
//				break;
//			} catch (e) {
//				//跳过
//			}	
//		}
//	} else {
//		throw new Error('浏览器不支持XHR对象！');
//	}
//}