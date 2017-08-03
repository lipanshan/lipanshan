$(document).ready(function(){
	    /*搜索框 点击边框变色*/
		$(".logo .kuangkuang").focus(function() {
	        $(this).addClass("cur");
	    }).blur(function() {
	        $(this).removeClass("cur");
	    })
	    /*搜索条件 点击边框变色*/
	    $(".sellerCenter .tiaojian input[type='text']").focus(function() {
	        $(this).addClass("dianji");
	    }).blur(function() {
	        $(this).removeClass("dianji");
	    })
	    $(".sellerCenter .tiaojian select,.pages input[type='text']").click(function() {
	        $(this).addClass("dianji");
	    }).blur(function() {
	        $(this).removeClass("dianji");
	    })
	    $(".tanchuang select,.tanchuang input[type='text']").click(function() {
	        $(this).addClass("dianji");
	    }).blur(function() {
	        $(this).removeClass("dianji");
	    })
	    $(".sellerCenter .goods select,.sellerCenter .goods input[type='text']").click(function() {
	        $(this).addClass("dianji");
	    }).blur(function() {
	        $(this).removeClass("dianji");
	    })
	    $(".detailEdit .box select,.detailEdit .box input[type='text']").click(function() {
	        $(this).addClass("dianji");
	    }).blur(function() {
	        $(this).removeClass("dianji");
	    })
	    /*个人中心下拉菜单*/
	    $(".logo .fr").hover(function(){ 
	    	    // $(".logo .fr ul").stop();
	    	    if( !$(".logo .fr ul").is(":animated") ){
	    	    	$(this).addClass("cur");
		    	    $(".logo .fr ul").slideDown(300); 
	    	    }
				
			},function(){ 
			    $(".logo .fr ul").slideUp(300,function(){
                $(".logo .fr").removeClass("cur");
	    	});
		}); 
		/*最顶部导航条 下拉菜单*/
		$(".topbar .seller").hover(function(){
			// $(this).children("ul").stop();
			// 
			
			if(!$(this).children("ul").is(":animated")){
				// $(this).addClass("cur");
				$(this).css("border-color","#ccc");
				$(this).children("ul").slideDown();
			}
           
		},function(){
			// $(this).removeClass("cur");
			$(this).children("ul").slideUp(300,function(){
				$(this).parent("div").css("border-color","#fff");
				// $(this).parent("div").removeClass("cur");
			});
        });
        $("input[type='text']").click(function() {
	        $(this).addClass("dianji");
	    }).blur(function() {
	        $(this).removeClass("dianji");
	    })
        /*以上是头部js，每个页面都有的*/
        
});