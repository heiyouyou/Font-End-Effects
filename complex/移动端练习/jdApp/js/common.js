//不可删除此代码，此代码作为所有业务逻辑代码的全局对象
var global = {
	wzy:{}//根据每个人的合作而定各自业务逻辑的对象
}
$(function(){
	//banner图
	global.wzy.banner ={
		normal: function(){
			var mySwiper = new Swiper ('.swiper-container',{
			    loop: true,//无缝切换
			    autoplay:true,//自动播放
			    speed:3000,//自动播放速度
				effect:"slide",//动画效果：slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
			    pagination: '.swiper-pagination',//分页容器
			    paginationType: 'bullets',//分页按钮样式:'bullets' or 'progress' or 'fraction' or 'custom'
			    lazyLoading: true,
				paginationClickable: true,//点击切换
				spaceBetween: 20//按钮之间的间距
			});
		},
		special:function(){
			var mySwiper = new Swiper ('.jd-seckill-slider',{
				loop: true,//无缝切换
			    autoplay:3000,//自动播放
			    width:121.333, //slide宽度
			    speed:2000,//自动播放速度
				effect:"slide"//动画效果：slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
			});
		}
	}
	global.wzy.banner.normal();
	global.wzy.banner.special();
	
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
	
	//顶部搜索框背景色变化
	global.wzy.changebg = function(){
		var op = 0;
		$(window).scroll(function(){
			var scrollTop = global.wzy.getScrollTop();
			if(scrollTop < 100 & scrollTop >20){
				op = 0.2;
			}else if(scrollTop>100&&scrollTop < 300){
				op = 0.5;
			}else if(scrollTop > 400){
				op = 0.85;
			}else if(scrollTop < 20){
				op = 0;
			}
			$(".jd-header").css({"background-color":"rgba(201,21, 35,"+op+")"});
		});
	};
	global.wzy.changebg();
	
	//获取滚动的距离
	global.wzy.getScrollTop = function(){
		return $(document).scrollTop() || $("html body").scrollTop();	
	}
	
	//京东文字轮播效果
	global.wzy.textBanner = {
		index:0,//轮播索引
		timer:null,//定时器
		init:function(){//初始化函数
			var $this = this;
			var $ul =  $(".news-list");
			var moveStep = $(".news-list").children().eq(0).height();
			var len = $(".news-list").children().length;
			//上翻
			function upEvent(){
				$this.index++;
				if($this.index == len){
					$this.index = 0;
					$ul.css({"top":0});
				}else{
					$ul.stop(true,true).animate({"top":$this.index*moveStep*-1});
				};
			};
			//下翻
			function downEvent(){
				$this.index--;
				if($this.index < 0){
					$this.index = len-1;
					$ul.css({"top":$this.index*moveStep*-1});
				}else{
					$ul.stop(true,true).animate({"top":$this.index*moveStep*-1});
				};
			}
			//初始化执行自动播放
			$this.auto(upEvent);
			//移入盒子消除定时器
			$(".scroll-news").hover(function(){
				if($this.timer)clearInterval($this.timer);
			},function(){
				$this.auto(upEvent);
			})
		},
		//自动动画
		auto:function(callback){
			if(callback){
				this.timer = setInterval(function(){
					callback();
				},2000);
			};
		}
	}
	global.wzy.textBanner.init();
	
	//加载更多数据
	global.wzy.loadMore = function(){
		//滚动加载更多数据
		var more = 0;
		loadScroll(function(){
			//more限制滚动加载的次数
			if(more < 3){
				setTimeout(function(){
					$("#recommendList").append("<li class='similar-li bgw pb5 mb5'>"+
		"						<a class='color2326 fz12' href='javascript:void(0);'>"+
		"							<div class='similar-product'>"+
		"								<img class='w' src='//m.360buyimg.com//mobilecms/s276x276_jfs/t3097/291/3343006965/88691/67a7ea00/57f130d2N3e3d53b3.jpg!q70.jpg' alt='1' />"+
		"								<span class='similar-product-text multi-lineEllipsis2 lh17 mtb5 parl5'>顾堂 新款仿羊毛汽车座垫 短毛绒汽车坐垫 秋冬季保暖通用女坐垫 大红色 其它车型</span>"+
		"								<span class='similar-product-price fz12 parl5'>¥<span class='big-price fw600 fz18'>498</span><span class='small-price'>.00</span><span class='fr guess-button tc color68 displayib mr5'>看相似</span></span>"+
		"							</div>"+
		"						</a>"+
		"					</li>"+
		"					<li class='similar-li bgw pb5 mb5'>"+
		"						<a class='color2326 fz12' href='javascript:void(0);'>"+
		"							<div class='similar-product'>"+
		"								<img class='w' src='//m.360buyimg.com//mobilecms/s276x276_jfs/t3178/307/18025558/213064/5ae954fd/57a03c08N7df24417.jpg!q70.jpg' alt='1' />"+
		"								<span class='similar-product-text multi-lineEllipsis2 lh17 mtb5 parl5'>【京东超市】富居(FOOJO)珊瑚绒地垫厨卫入门垫40*60cm七彩羽叶</span>"+
		"								<span class='similar-product-price fz12 parl5'>¥<span class='big-price fw600 fz18'>15</span><span class='small-price'>.00</span><span class='fr guess-button tc color68 displayib mr5'>看相似</span></span>"+
		"							</div>"+
		"						</a>"+
		"					</li>");
					$("#loading").hide();
					window.loadMark = false;
					more++;
				},1000);
			}else{
				$("#loading").hide();
			}
		});
		//点击加载更多数据
		$("#loadMore").on("click",function(){
			loading("#loading",7);
			setTimeout(function(){
				$("#recommendList").append("<li class='similar-li bgw pb5 mb5'>"+
		"						<a class='color2326 fz12' href='javascript:void(0);'>"+
		"							<div class='similar-product'>"+
		"								<img class='w' src='//m.360buyimg.com//mobilecms/s276x276_jfs/t3097/291/3343006965/88691/67a7ea00/57f130d2N3e3d53b3.jpg!q70.jpg' alt='1' />"+
		"								<span class='similar-product-text multi-lineEllipsis2 lh17 mtb5 parl5'>顾堂 新款仿羊毛汽车座垫 短毛绒汽车坐垫 秋冬季保暖通用女坐垫 大红色 其它车型</span>"+
		"								<span class='similar-product-price fz12 parl5'>¥<span class='big-price fw600 fz18'>498</span><span class='small-price'>.00</span><span class='fr guess-button tc color68 displayib mr5'>看相似</span></span>"+
		"							</div>"+
		"						</a>"+
		"					</li>"+
		"					<li class='similar-li bgw pb5 mb5'>"+
		"						<a class='color2326 fz12' href='javascript:void(0);'>"+
		"							<div class='similar-product'>"+
		"								<img class='w' src='//m.360buyimg.com//mobilecms/s276x276_jfs/t3178/307/18025558/213064/5ae954fd/57a03c08N7df24417.jpg!q70.jpg' alt='1' />"+
		"								<span class='similar-product-text multi-lineEllipsis2 lh17 mtb5 parl5'>【京东超市】富居(FOOJO)珊瑚绒地垫厨卫入门垫40*60cm七彩羽叶</span>"+
		"								<span class='similar-product-price fz12 parl5'>¥<span class='big-price fw600 fz18'>15</span><span class='small-price'>.00</span><span class='fr guess-button tc color68 displayib mr5'>看相似</span></span>"+
		"							</div>"+
		"						</a>"+
		"					</li>");
				$("#loading").hide();
			},1000);
		});
	};
	global.wzy.loadMore();
});