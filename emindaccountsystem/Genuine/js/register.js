window.onload=function(){
	$('.register').show();
	$('.register2').hide();
	$('.register3').hide();
	$('.jnext').click(function(){
		$('.register1').hide();
		$('.register2').show();
		$('#ju2').toggleClass('jul2');
		$('.register3').hide();
	})
	$('.jnext1').click(function(){
		$('.register1').hide();
		$('.register2').hide();
		$('.register3').show();	
		$('#ju3').toggleClass('jul2');
		countDown(5,'../html/signin.html');		
	})
/**********************************账号格式判断*****************************************/
		$('#txt_username').bind('blur', function() {
		var v = $('#txt_username').val();
		if(v != '') {
			var oPhone = /^1[34578]\d{9}$/.test(v);
			var oEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g.test(v);
			if(oPhone || oEmail) {
				$('#p0').html('');
			} else {
				$('#p0').html('您输入的账号格式不正确');
			}
		} else {
			$('#p0').html('');
			return;
		}
	});

	function lineMove(){
		var line = $('.jli1');
		var radius = $('.jli2');
		for(var i =0; i< line.length; i++){
			line[i].style.overflow = 'hidden';
			line[i].style.backgroundColor = 'transparent';
			radius[i].style.overflow = 'hidden';
			radius[i].style.backgroundColor = 'transparent';
			line[i].innerHTML = '<div style="position:absolute;left:-'+line[i].clientWidth+'px;top:13px;width:'+line[i].clientWidth+'px;height:'+line[i].clientHeight+'px;padding-left:'+line[i].clientWidth+'px;background-color:#005bc3;"><div style="width:100%;height:100%;background-color:#ccc;"></div></div>'
			radius[i].innerHTML = '<div style="position:absolute;left:-'+radius[i].clientWidth+'px;top:0px;width:'+radius[i].clientWidth+'px;height:'+radius[i].clientHeight+'px;padding-left:'+radius[i].clientWidth+'px;background-color:#005bc3;"><div style="width:100%;height:100%;background-color:#ccc;"></div></div><div style="position:absolute;left:0;top:0;z-index:10;width:100%;height:100%;background-color:transparent;">'+(i+1)+'</div>'
		}
	}
	lineMove();
}