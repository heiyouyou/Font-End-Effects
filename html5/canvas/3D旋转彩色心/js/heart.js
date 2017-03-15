function getGraph(opts){
	var heart3D = document.getElementById("heart3D");
	// 默认参数
	var defaultOpts = {
		borderWidth:"1px 1px 0 0",//图形的边框粗细
		borderRadius:"50% 50% 50%/40% 50% 0",//图形边框的圆角
		borderStyle:"solid",//图形边框的风格
		width:"100",//图形的宽
		height:"160",//图形的高
		translateX:30,//图形的水平位移量
		rotateZ:45,//图形的z轴旋转角度
		graph:36//图形个数
	};
	// 判断是否有配置参数传入，没有就用默认的
	if(!opts)opts = defaultOpts;
	// 传入的配置参数不足时，使用默认的
	for(key in defaultOpts){
		if(!opts[key]){
			opts[key] = defaultOpts[key];
		}
	}
	// 改变父盒子的宽高
	heart3D.style.width = opts.width+"px";
	heart3D.style.height = opts.height+"px";
	// 创建边框线
	for(var i = 0;i<opts.graph;i++){
		var divDom = document.createElement("div");
		divDom.style.transform = "rotateY("+i*(360/opts.graph)+"deg) rotateZ("+opts.rotateZ+"deg) translateX("+opts.translateX+"px)";
		divDom.style.borderColor = Color();
		divDom.style.borderWidth = opts.borderWidth;
		divDom.style.borderRadius = opts.borderRadius;
		divDom.style.borderStyle = opts.borderStyle;
		divDom.style.width = opts.width+"px";
		divDom.style.height = opts.height+"px";
		heart3D.appendChild(divDom);
	};
};
// 随机十六进制的颜色函数
function Color(){
	var oColor = Math.ceil(Math.random()*16777215).toString(16);//16777215 >> ffffff十六进制的最大值
	// 可能出现5位或者6位的十六进制数
	while(oColor.length < 6){
		oColor = "0" +oColor;
	}
	return "#"+oColor;
}