window.onload=function(){
	$('.RetrievePasswordOne').show();
	$('.RetrievePasswordTwo').hide();
	$('.RetrievePasswordThree').hide();
	$('.RetrievePasswordFour').hide();
	$('.jnext1').click(function(){
		$('.RetrievePasswordOne').hide();
		$('.RetrievePasswordTwo').show();
		$('.RetrievePasswordThree').hide();
		$('.RetrievePasswordFour').hide();
		$('#ju2').toggleClass('jul2');
	})
	$('.jnext2').click(function(){
		$('.RetrievePasswordOne').hide();
		$('.RetrievePasswordTwo').hide();
		$('.RetrievePasswordThree').show();
		$('.RetrievePasswordFour').hide();
		$('#ju3').toggleClass('jul2');
	})
	$('.jnext3').click(function(){
		$('.RetrievePasswordOne').hide();
		$('.RetrievePasswordTwo').hide();
		$('.RetrievePasswordThree').hide();
		$('.RetrievePasswordFour').show();
		$('#ju4').toggleClass('jul2');
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