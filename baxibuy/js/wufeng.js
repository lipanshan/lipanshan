function wufeng(jiangeshijian){
	// alert(111);

	var nowleft = 0;	
	var mytimer;
	var sum = 0;	
	var shang = true;
	var jiangeshijian = 3000;
	$(".xiaokuang.fr.wufeng ul").css("top","0px");
	$(".wufeng ul").html($(".wufeng ul").html() + $(".wufeng ul").html() + $(".wufeng ul").html() + $(".wufeng ul").html() + $(".wufeng ul").html() + $(".wufeng ul").html() + $(".wufeng ul").html() + $(".wufeng ul").html() + $(".wufeng ul").html() + $(".wufeng ul").html());
	$(".wufeng ul li").each(
		function(){
			sum = sum + $(this).outerHeight(true);
			// console.log(sum);
		}

	);
	
	

	
	gun();

	
	function gun(){

		// alert('ddd');
		shang = true;
		window.clearInterval(mytimer);
		mytimer = window.setInterval(
			function(){
             
				if(nowleft == -sum+28){
					nowleft = 0;
					$(".wufeng ul").animate({top:nowleft},50,function(){
						//动画执行之后，往0上面瞬移
						$(".wufeng ul").css("top",0);
					});
				}else{
					nowleft = nowleft - 28;	
					$(".wufeng ul").animate({top:nowleft},100);
				}
				
				
				// $("#box").animate({height:"300px"});
				
			}
			,jiangeshijian
		);
	}
	function fangun(){
        shang = false;
		
		window.clearInterval(mytimer);
		mytimer = window.setInterval(
			function(){
             
				if(nowleft == 0){
					nowleft = -sum;
				}else{
					nowleft = nowleft + 1;	
				}
				// console.log(nowleft);
				$(".wufeng ul").css("top",nowleft);
			}
			,jiangeshijian
		);
	}

	
	$(".wufeng").mouseover(
		function(){
			window.clearInterval(mytimer);
		}
	);
	$(".wufeng").mouseover(
		function(){
			window.clearInterval(mytimer);
		}
	);
	$(".zuojian").mouseover(function(){
		shang = false;
		fangun();
	});
	$(".youjian").mouseover(function(){
		shang = true;
		gun();
	});

	
	$(".wufeng").mouseout(function(){
		if(shang == true){
			gun();
		}else{
			fangun();
		}
	});
}