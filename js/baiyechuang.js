function baiyechuang(){	
	var nowimg = 0;
	var mytimer = 0;

	function dongdong(){
		window.clearInterval(mytimer);
		mytimer = window.setInterval(
			function(){
				$(".right_but").trigger("click");
			}
			,1000
		);
	}

	$(".computer").mouseleave(
		function(){
			window.clearInterval(mytimer);
			$("#baiyechuang").css("display","none");
			$(".pingmian").animate({"left":390},500);
			$(".lianxiaa").animate({"left":390},500);

		}
	);

	$(".computer").mouseenter(
		function(){
			dongdong()
			$("#baiyechuang").css("display","block");
			$(".pingmian").animate({"left":466},500);
			$(".lianxiaa").animate({"left":466},500);

		}
	)

	$(".right_but").click(
		function(){
			// 先折腾信号量
			if(nowimg < $(".tuul li").length - 1){
				nowimg ++;
			}else{
				nowimg = 0;
			}
			huanhuan();
		}
	);



	function huanhuan(){
		// 换猫腻的图片，换成信号量所表示的li中的那个图片
		var temp = $(".tuul li img").eq(nowimg).attr("src");
		$(".maoni div").css("background-image","url(" + temp + ")");

		// 让猫腻图进行动画！
		$(".maoni div").animate({"width":31},400,function(){
			//在动画执行完毕之后，让猫腻的宽度恢复为0
			$(".maoni div").css("width",0);
			$(".tuul li").eq(nowimg).show().siblings().hide();
		});
	}
}