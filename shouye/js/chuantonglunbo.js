function lunbo(){
	//程序的最开始，复制一个li，追加到ul的最后
	$("#lunbo .tupian li:first").clone().appendTo("#lunbo .tupian ul");

	var nowimg = 0;	//信号量，指示的是当前图片的编号。
	var mytimer;
	
	//自动轮播
	mytimer = window.setInterval(youanniudongzuo,1000);

	//右按钮的监听，绑定的是一个有名函数youanniudongzuo，目的是为了定时器也方便调用
	$("#lunbo #youanniu").click(youanniudongzuo);
	
	//右按钮动作函数
	function youanniudongzuo(){
		if(!$("#lunbo .tupian ul").is(":animated")){
			if(nowimg < $("#lunbo .tupian li").length - 2){
				//当还没有滚动到最后一张图的时候，进行正常的轮播
				nowimg ++;
				//动画！
				$("#lunbo .tupian ul").animate({"left":-980 * nowimg},600);
			}else{
				nowimg = 0;
				//当到了最后一张图的时候，往猫腻图上拉一次，然后瞬间变为0；
				$("#lunbo .tupian ul").animate({"left":-980 * ($("#lunbo .tupian li").length-1)},600,function(){
					//动画执行之后，往0上面瞬移
					$("#lunbo .tupian ul").css("left",0);
				});
			}
			//小圆点
			$("#lunbo #xiaoyuandianul li").eq(nowimg).addClass("cur").siblings().removeClass("cur");
		}
	}

	//左按钮的监听
	$("#lunbo #zuoanniu").click(
		function(){
			if(!$("#lunbo .tupian ul").is(":animated")){
				if(nowimg > 0){
					//还没有到第1张图的时候，所以正常执行动画
					nowimg --;
					//动画！
					$("#lunbo .tupian ul").animate({"left":-980 * nowimg},600);
				}else{
					nowimg = $("#lunbo .tupian li").length - 2;

					//已经到达最后一张图了
					$("#lunbo .tupian ul").css("left",-980 * ($("#lunbo .tupian li").length-1));
					$("#lunbo .tupian ul").animate({"left":-980 * nowimg},600);
				}

				
				$("#lunbo #xiaoyuandianul li").eq(nowimg).addClass("cur").siblings().removeClass("cur");
			}
		}
	);

	//小圆点的监听
	$("#lunbo #xiaoyuandianul li").click(
		function(){
			if(!$("#lunbo .tupian ul").is(":animated")){
				nowimg = $(this).index();
				//动画！
				$("#lunbo .tupian ul").animate({"left":-980 * nowimg},600);
				$("#lunbo #xiaoyuandianul li").eq(nowimg).addClass("cur").siblings().removeClass("cur");
			}
		}
	);

	$("#lunbo").mouseenter(
		function(){
			window.clearInterval(mytimer);
		}
	);

	$("#lunbo").mouseleave(
		function(){
			window.clearInterval(mytimer);
			//自动轮播
			mytimer = window.setInterval(youanniudongzuo,1000);
		}
	);
}