function xialalunbo(){
var nowimg = 0;
	var mytimer = 0;

	function dongdong(){
		window.clearInterval(mytimer);
		mytimer = window.setInterval(
			function(){
				huanhuan()
			}
			,1000
		);
	}

	$(".shouji").mouseleave(
		function(){
			window.clearInterval(mytimer);
			$("#xialalunbo").fadeOut();
			$(".meishou").hide(500);

		}
	);

	$(".shouji").mouseenter(
		function(){
			dongdong()
			$(".meishou").show(500);
			$("#xialalunbo").fadeIn();

		}
	)


	function huanhuan(){
		if(nowimg < $(".tuul2 li").length - 1){
				nowimg ++;
			}else{
				nowimg = 0;
			}		
		var temp = $(".tuul2 li img").eq(nowimg).attr("src");
		$(".maoni2").css("background-image","url(" + temp + ")");
		$(".maoni2").animate({"height":153},500,function(){
			$(".maoni2").css("height",0);
			$(".tuul2 li").eq(nowimg).show().siblings().hide();
		});
	}
}