window.onload=function(){
	 
/*******************************默认鼠标效果**********************************************/
		var x = document.getElementById('again');
		var p0 = document.getElementById('p0');
		var p4 = document.getElementById('p4');
		var txt_username = document.getElementById('txt_username');
		var zhdl = document.getElementById('zhdl');
		var kjdl = document.getElementById('kjdl');
		var jleft = document.getElementById('jleft');
		var jright = document.getElementById('jright');
		zhdl.onclick = function zhanghao(){
			p0.innerHTML='';
			txt_username.innerHTML='';
			txt_username1.innerHTML='';
			jleft.style.display='block';
			jright.style.display='none';
			zhdl.style.color='#3f3f3f';
			zhdl.style.fontWeight='bold';
			kjdl.style.color='#adadad';
			kjdl.style.fontWeight='normal';
			
		}
		kjdl.onclick = function kuaijie(){
			p0.innerHTML='';
			txt_username.innerHTML='';
			txt_username1.innerHTML='';
			jleft.style.display='none';
			jright.style.display='block';
			kjdl.style.color='#3f3f3f';
			kjdl.style.fontWeight='bold';
			zhdl.style.color='#adadad';
			zhdl.style.fontWeight='normal';
			
		}
		x.onclick = function() {
			txt_username.value = "";
		}
	
/************************************自动登录*************************************************/
		if($.cookie("rmbUser") == "true") {
			$("#ck_rmbUser").attr("checked", true);
			$("#txt_username").val($.cookie("username"));
			$("#txt_password").val($.cookie("password"));
		}
	

		//记住用户名密码
		function Save() {
			if($("#ck_rmbUser").attr("checked")) {
				var str_username = $("#txt_username").val();
				var str_password = $("#txt_password").val();
				$.cookie("rmbUser", "true", {
					expires: 7
				}); //存储一个带7天期限的cookie
				$.cookie("username", str_username, {
					expires: 7
				}); 
				$.cookie("password", str_password, {
					expires: 7
				});
			} else {
				$.cookie("rmbUser", "false", {
					expire: -1
				});
				$.cookie("username", "", {
					expires: -1
				});
				$.cookie("password", "", {
					expires: -1
				});
			}
		};
		/**********************************账号格式判断**账号和密码的最大长度在html里有限制****************************************/
//		账号密码登录账号判断
		$('#txt_username').bind('blur', function() {
		var v = $('#txt_username').val();
		if(v != '') {
			var oPhone = /^1[34578]\d{9}$/.test(v);
			var oEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g.test(v);
			if(oPhone || oEmail) {
				$('#p0').html(' ');
			} else {
				$('#p0').html('您输入的账号格式不正确');
			}
		} else {
			$('#p0').html(' ');
			return;
		}
	}); 
//	快捷登录账号判断
	$('#txt_username1').bind('blur', function() {
		var v = $('#txt_username1').val();
		if(v != '') {
			var oPhone = /^1[34578]\d{9}$/.test(v);
			var oEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g.test(v);
			if(oPhone || oEmail) {
				$('#p0').html(' ');
			} else {
				$('#p0').html('您输入的账号格式不正确');
			}
		} else {
			$('#p0').html(' ');
			return;
		}
	}); 
	
	/**************************************密码格式判断***************************************************/					
	$('#txt_password').bind('blur', function() {
		var v=$('#txt_password').val();
		if (v!='') {
			var l = v.length;
			if (l<8) {			
				$('#p0').html('您输入的密码错误');		
			}else{
				$('#p0').html(' ');
			}
		} else{
			$('#p0').html(' ');
		}
		
	}); 
	//此方法为图片验证码显示，num 为输入错误的次数不能超过3次
	function showView3(num){
		if(num>=3){
			$('#view3show').show(0);
		}else {
			$('#view3show').hide(0);
		}
	};
//	showView3(4);
//	showView3(2);
};