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
}