$(function(){
	//banner图
	var mySwiper = new Swiper ('.swiper-container',{
	    loop: true,//无缝切换
	    autoplay:true,//自动播放
	    speed:3000,//自动播放速度
		effect:"coverflow",//动画效果：slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
	    pagination: '.swiper-pagination',//分页容器
	    paginationType: 'progress',//分页按钮样式:'bullets' or 'progress' or 'fraction' or 'custom'
	    lazyLoading: true,
		paginationClickable: true,//点击切换
		spaceBetween: 20//按钮之间的间距
	});
	
	//音乐播放
	(function(){
		//获取媒体对象
		var audioDom = $("#audio")[0];
		//暂定只有四首歌曲，后面可以根据数据量来定义
		var len = 4;
		//当前播放的歌曲位
		var clen = 0;
		var music = {
			//点击播放音乐
			click:function(){
				$(document).on('click',".mplay",function(){
					//获取当前播放列表的索引
					clen = $(this).parents(".music-items").index();
					//切换音乐的开关
					var flag = $(this).find("i").hasClass("icon-play-circle");
					//获取音乐地址
					var link = $(this).data("link");
					//判断是否同一首歌，如果是则不重新播放
					if(audioDom.src.indexOf(link) == -1){
						audioDom.src = link;
					};
					//如果当前点击的处于播放状态则进行停止播放，反则播放
					audioDom[flag?"play":"pause"]();
					//首先将所有其他播放图标归为初始状态
					$(".mplay").find("i")["removeClass"]("icon-pause")["addClass"]("icon-play-circle");
					//找到当前点击的进行切换播放图标
					$(this).find("i")[flag ?"addClass":"removeClass"]("icon-pause")[flag?"removeClass":"addClass"]("icon-play-circle");
					//自动播放下一首
					music.auto(clen);
				});
			},
			//自动播放下一首
			auto:function(index){
				//监听播放结束后自动切换下一首歌曲，使用属性绑定事件，防止重复绑定
				audioDom.onended = function(){
					//每次切换重新获取当前音乐列表
					len = $(".music-items").length;
			 		index++;
			 		index %=len;
			 		console.log(len+"=="+index);
					//获取音乐地址
					var link = $(".music-items").eq(index).find(".mplay").data("link");
					audioDom.src = link;
					audioDom.load();
					audioDom.play();
					//首先将所有其他播放图标归为初始状态
					$(".mplay").find("i")["removeClass"]("icon-pause")["addClass"]("icon-play-circle");
					//找到当前播放的进行切换播放图标
					$(".music-items").eq(index).find(".mplay").find("i")["removeClass"]("icon-play-circle")["addClass"]("icon-pause");
			 	};
			}
		}
		//播放出错时，进行提示
		audioDom.addEventListener('error',function(){
			console.log("路径无法读取....");	
		});
		//动态扩展播放音乐的方法
		global.wzy.playMusic = music;
	 })();
	 global.wzy.playMusic.click();
	 
	//播放音乐列表
	(function(){
		var loadMusicList = {
			//加载索引，用来获取音乐地址
			loadIndex:0,
			//滚动加载数据
			load:function(){
				//滚动到底部加载数据
				loadScroll(function(){
					loadMusicList.loadIndex %=7;
					loadMusicList.loadIndex++;
					//模拟Ajax加载数据
					setTimeout(function(){
						$("#day-ul").append("<li class='music-items'>"+
	"								<p class='tc pd10 fz12'>推荐人： LUO・2016-11-18</p>"+
	"								<div class='imgbox tc pr'>"+
	"									<a href='javascript:void(0);' class='cateLink fz12 redText'>秋别之伤<i class='icon icon-fire ml5 mr5'></i>11.5°</a>"+
	"									<img class='bgpic' src='img/music"+loadMusicList.loadIndex+".jpg' alt='1'>"+
	"									<a class='fz48 pa mplay' href='javascript:void(0);' data-link='mp3/0"+loadMusicList.loadIndex+".mp3'><i class='icon icon-play-circle'></i></a>"+
	"								</div>"+
	"								<div class='bgw tc'>"+
	"									<h3 class='fw600 patb10'>秋别</h3>"+
	"									<a class='redText' href='javascript:void(0);'>离别，不一定带来撕心裂肺的伤感绝望，也可以优雅从容。夜晚，躲在觥筹交错的钢筋水泥丛林之下，我们经历着爱情的来临和离去，甜美和忧愁，每次分离，你都浪漫地称它为——《秋别》。解忧爵士双人组Mr.Miss是一对气场奇诡的北大学霸男女，致力...</a>"+
	"								</div>"+
	"								<div class='bgw pd10 tc'>"+
	"									<a href='#' class='fz12 redText'>"+
	"										<img class='avatar' src='img/pic1.jpg'>"+
	"										<span class='vm'>零零发没有发</span>"+
	"									</a>"+
	"								</div>"+
	"							</li>");
						//数据加载完毕，loading隐藏
						$("#loading").hide();
						//当数据加载完毕进行，打开锁，再次进行请求数据
						window.loadMark = false;
					},1000);
				});
				
			}
		};
		global.wzy.loadList = loadMusicList;
	})();
	global.wzy.loadList.load();	
})