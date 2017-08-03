function zhuandong(){
   var x=0;
   var y=0;
	$("#zuo").click(
		function(){
			y-=90;
			$(".dd ul").css("-webkit-transform","rotateY("+y+"deg)");
			haha()
		}
	)
	$("#you").click(
		function(){
			y+=90;
			$(".dd ul").css("-webkit-transform","rotateY("+y+"deg)");
			haha()
		}
	)
	function haha(){
		if((y%360==0)){
	            $(".lianxi .shouji").show(500).siblings().hide(500);
	             
	          }
	 	else if((y%360==-90)||(y%360==270)){
	            $(".lianxi .youxiang").show(500).siblings().hide(500);
	             
	          }
	    else if((y%360==90)||(y%360==-270)){
	            $(".lianxi .weibo").show(500).siblings().hide(500);
	             
	          }
	    else if((y%360==180)||(y%360==180)){
	            $(".lianxi .qq").show(500).siblings().hide(500);
	             
	          }
      }

}