function chuantong(){


var nowimg=0;
var mytimer = 0;
function dongdong(){
	window.clearInterval(mytimer);
	mytimer = window.setInterval(
		function(){
			$(".chuantong li").eq(nowimg).fadeOut(1000);
			nowimg ++;
			nowimg = nowimg % $(".chuantong li").length;	
			$(".chuantong li").eq(nowimg).fadeIn(1000);

			
		},1000
	)
}

$(".pingmian").mouseenter(
	function(){
		$(".chuantong").fadeIn(1000);
		$(".tutu").css("display","block");
		dongdong();

	}
)
$(".pingmian").mouseleave(
	function(){
		$(".chuantong").css("display","none");
		window.clearInterval(mytimer);
		$(".tutu").css("display","none");
	}
)

}